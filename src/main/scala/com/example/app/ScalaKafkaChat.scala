package com.example.app

import org.scalatra._
import scalate.ScalateSupport

class ScalaKafkaChat extends Scala_kafka_chatStack {

  get("/") {
   contentType = "text/html"

   layoutTemplate("/WEB-INF/templates/views/hello-scalate.jade")

  }

}
