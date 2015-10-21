package com.example.app

import org.apache.http.client.methods._
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.DefaultHttpClient

object KafkaHost {
	def addr():String = { "http://localhost:8082" } // DO NOT INCLUDE A TRAILING SLASH!
	def contentType():String = { "application/vnd.kafka.avro.v1+json" }
}

class KafkaProducer {
	def send(sender: String, text: String) {
		val kafkaTopic = "chatroom"
		var avroPayload = toAvro(sender, text)

		// println(avroPayload)
		val request = new HttpPost(KafkaHost.addr() + "/topics/chatroom")
		request.setHeader("Content-type", KafkaHost.contentType())
		request.setEntity(new StringEntity(avroPayload))

		try {
			val response = (new DefaultHttpClient).execute(request)
			//println(response)
		}
		catch {
			case e: Exception => println(e)
		}
	}

	def toAvro(sender: String, text: String):String = {
		//Man, this escaping is a nightmare. We have to pass the Avro schema along with the actual message payload.
		// That schema is a JSON object that is serialized to an escaped string and passed as a string value.
		"{\"value_schema\": \"{\\\"type\\\": \\\"record\\\", \\\"name\\\": \\\"message\\\", \\\"fields\\\": [{\\\"name\\\": \\\"sender\\\", \\\"type\\\": \\\"string\\\"},{\\\"name\\\": \\\"text\\\", \\\"type\\\": \\\"string\\\"}]}\", \"records\": [{\"value\": {\"sender\": \"" + sender + "\", \"text\": \"" + text + "\"}}]}"
	}
}