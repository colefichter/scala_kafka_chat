package com.example.app

import org.scalatra._
import scalate.ScalateSupport

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

  }
}
