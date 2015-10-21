package com.example.app

import org.scalatra._
import scalate.ScalateSupport
import net.liftweb.json._

class ScalaKafkaChat extends Scala_kafka_chatStack {
  get("/") {
   contentType = "text/html"

   layoutTemplate("/WEB-INF/templates/views/hello-scalate.jade")
  }

  post("/login/:name") {
    val name = params("name")
    KafkaConsumer.createConsumerProxy(name)
  }

  post("/logout/:name") {
    val name = params("name")
    KafkaConsumer.deleteConsumerProxy(name)
  }

  get("/messages/:name") {
    val name = params("name")
    val messagesJson = KafkaConsumer.getMessages(name)

    println("MESSAGES " + messagesJson)

    messagesJson
  }

  post("/message") {    
    implicit val formats = DefaultFormats // needed for Lift-JSON
    


    val jValue = parse(request.body) // convert the JSON string to a JValue object
    val message = jValue.extract[Message] // deserialize the string into a Stock object
    
    println("RECEIVED " + message)

    new KafkaProducer().send(message.sender, message.text)
  }

  // def publishMessage(message: Message): Unit = {
  //   val json = serializeMessage(message)
  //   new KafkaProducer().send(message.topic, json)
  // }

  // def serializeMessage(message: Message): String = {
  //   // needed for Lift-JSON
  //   implicit val formats = DefaultFormats
  //   val jsonString = Serialization.write(message)
  //   println("SERIALIZED " + jsonString)

  //   jsonString
  // }
}

class Message (var text: String, var sender: String) {
  override def toString = sender + ": " + text
}