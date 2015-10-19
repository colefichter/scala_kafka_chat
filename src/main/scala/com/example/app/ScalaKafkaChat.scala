package com.example.app

import org.scalatra._
import scalate.ScalateSupport
import net.liftweb.json._

class ScalaKafkaChat extends Scala_kafka_chatStack {
  get("/") {
   contentType = "text/html"

   layoutTemplate("/WEB-INF/templates/views/hello-scalate.jade")
  }

  //I can't get the scalatra JSON support working, so just build a JSON string manually:
  get("/topics") {
  	contentType = "application/json"


  	//TODO: fetch topics from KAFKA!

  	"[\"Sports\", \"Hobbies\", \"Books\", \"Movies\", \"Travel\", \"Food\"]"
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
    println(message)


    //TODO: send message to KAFKA!
  }
}

class Message (var text: String, var sender: String) {
  override def toString = sender + ": " + text
}