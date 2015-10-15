package com.example.app

import org.scalatra._
import scalate.ScalateSupport

class ScalaKafkaChat extends Scala_kafka_chatStack {

  get("/") {
    <html>
      <body>
        <h1>Hello, world!</h1>
        Say <a href="hello-scalate">hello to Scalate</a>.

It's WORKING! And some more with reloading.

      </body>
    </html>
  }

}
