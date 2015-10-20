package com.example.app

import org.scalatra._
import scalate.ScalateSupport
import net.liftweb.json._

class ScalaKafkaChat extends Scala_kafka_chatStack {
  get("/") {
   contentType = "text/html"

   layoutTemplate("/WEB-INF/templates/views/hello-scalate.jade")
  }

  post("/message") {
    // get the POST request data
    val jsonString = request.body

    // needed for Lift-JSON
    implicit val formats = DefaultFormats

    // convert the JSON string to a JValue object
    val jValue = parse(jsonString)
    // deserialize the string into a Stock object
    val message = jValue.extract[Message]
    // for debugging
    println("RECEIVED " + message)


    publishMessage(message)
  }

  def publishMessage(message: Message): Unit = {
    val json = serializeMessage(message)
    new KafkaProducer().send(message.topic, json)
  }

  def serializeMessage(message: Message): String = {
    // needed for Lift-JSON
    implicit val formats = DefaultFormats
    val jsonString = Serialization.write(message)
    println("SERIALIZED " + jsonString)

    jsonString
  }
}

class Message (var topic: String, var text: String, var sender: String) {
  override def toString = "(" + topic + ") " + sender + ": " + text
}