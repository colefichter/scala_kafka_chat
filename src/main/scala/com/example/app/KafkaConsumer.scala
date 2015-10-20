package com.example.app

import org.apache.http.client.methods._
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.DefaultHttpClient

// Use the Confluent REST API to consume messages
object KafkaConsumer {
	def createConsumerProxy(name: String) {

		//TODO: test this!

		val jsonParams = """{"id":"my_instance","format":"json"}, "auto.offset.reset": "smallest"}"""
		
		val request = new HttpPost("http://localhost:8082/consumers/" + name)
		request.setHeader("Content-type", "application/json")
		// add the JSON as a StringEntity
		request.setEntity(new StringEntity(jsonParams))
		val response = (new DefaultHttpClient).execute(request)
		 
		println(response)
	}

	def deleteConsumerProxy(name: String) {
		//TODO: write this
	}

	def getMessages(name: String) {
		val request = new HttpGet("http://localhost:8082/consumers/" + name +"/instance/my_instance/chatroom")
		request.setHeader("Content-type", "application/json")
		val response = (new DefaultHttpClient).execute(request)
		 
		println(response)

		//TODO: how to return messages?
	}
}