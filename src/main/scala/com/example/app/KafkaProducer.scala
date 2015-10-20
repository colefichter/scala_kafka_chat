package com.example.app

import java.util.Properties
import kafka.common.QueueFullException
import kafka.javaapi.producer.Producer
import kafka.producer.{ProducerConfig, KeyedMessage}

class KafkaProducer {
	def send(topic: String, jsonPayload: String): Unit = {
		val config:ProducerConfig = getProducerConfig
		val producer = new Producer[String, String](config)
		val data = new KeyedMessage[String, String](topic, jsonPayload)

		try {
			println("SENT " + jsonPayload)
			producer.send(data)
		}
		catch { 
			//TODO: gracfully handle failure when we can't connect to kafka.
			case e: QueueFullException => //TODO: anything?
		}
		finally {
			producer.close
		}
	}

	def getProducerConfig: ProducerConfig = {
		val props = new Properties()

		props.put("metadata.broker.list", "localhost:9092")
		props.put("serializer.class", "kafka.serializer.StringEncoder")
		props.put("request.required.acks", "1")

		new ProducerConfig(props)
	}
}