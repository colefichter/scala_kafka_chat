package com.example.app

import org.apache.http.client.methods._
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.DefaultHttpClient
import org.apache.http.util.EntityUtils

// Use the Confluent REST API to consume messages
object KafkaConsumer {
	def createConsumerProxy(name: String) {

		val url = KafkaHost.addr() + "/consumers/" + name		
		val consumerProxyConfig = "{\"id\": \"my_instance\", \"format\": \"avro\", \"auto.offset.reset\": \"smallest\"}"
		
		println(url)
		println(consumerProxyConfig)

		val request = new HttpPost(url)
		request.setHeader("Content-type", KafkaHost.contentType())
		// add the JSON as a StringEntity
		request.setEntity(new StringEntity(consumerProxyConfig))
		val response = (new DefaultHttpClient).execute(request)

		println(response)
	}

	def deleteConsumerProxy(name: String) {
		//TODO: write this
	}

	def getMessages(name: String):String = {
		val request = new HttpGet(KafkaHost.addr() + "/consumers/" + name + "/instances/my_instance/topics/chatroom")
		request.setHeader("Content-type", KafkaHost.contentType())
		
		val response = (new DefaultHttpClient).execute(request)
		
		val messagesJson = EntityUtils.toString(response.getEntity())

		println("*** MESSAGES RES: " + messagesJson)

		messagesJson
	}
}