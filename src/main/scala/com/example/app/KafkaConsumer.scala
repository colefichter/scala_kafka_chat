package com.example.app

import org.apache.http.client.methods._
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.DefaultHttpClient

// I'm having trouble writing a proper consumer in scala, so use the Rest API
class KafkaConsumer {

	def createConsumer() {
		val jsonParams = """{"id":"my_instance","format":"json"}, "auto.offset.reset": "smallest"}"""


		// create an HttpPost object
		val post = new HttpPost("http://localhost:8082/consumers/my_message_consumer")
		 
		// set the Content-type
		post.setHeader("Content-type", "application/json")
		 
		// add the JSON as a StringEntity
		post.setEntity(new StringEntity(jsonParams))
		 
		// send the post request
		val response = (new DefaultHttpClient).execute(post)
		 
		println(response)
	}

	def getMessages(topic: String) {
		val request = new HttpGet("http://localhost:8082/consumers/my_message_consumer/instance/my_instance/topics/" + topic)
		 
		request.setHeader("Content-type", "application/json")
		val response = (new DefaultHttpClient).execute(request)
		 
		println(response)
	}
}



// package com.example.app

// import java.util.HashMap
// import java.util.Properties
// import kafka.consumer.ConsumerIterator
// import kafka.consumer.KafkaStream
// import kafka.consumer.ConsumerConfig
// import kafka.javaapi.consumer.ConsumerConnector

// abstract class ConsumerTest() extends Runnable {

//     def processMessages(topic: String) {

//     	val zookeeper = "localhost:2181"
//     	val groupId = "group1" //TODO: what should this be?

//     	val config:ConsumerConfig = getConsumerConfig(zookeeper, groupId)

//     	val consumer = kafka.consumer.Consumer.createJavaConsumerConnector(config)

//     	val numThreads = 1
//     	val topicCount = 1 //Feed the data from all partitions into one stream

// 		val topicCountMap = new HashMap[String, Integer]
// 		topicCountMap.put(topic, new Integer(numThreads))

//     	val consumerMap = consumer.createMessageStreams(topicCountMap);
//     	val streams = consumerMap.get(topic);



//     	val messageStream = streams[0]
//     	processStream(messageStream)


        
//     }

//     def processStream(stream: KafkaStream[Array[Byte], Array[Byte]]) {
//     	val it = stream.iterator();
//         while (it.hasNext()){
//             System.out.println(new String(it.next().message()));        
//         }

//         println("DONE PROCESSING")
//     }

//     def getConsumerConfig(zookeeper: String, groupId: String): ConsumerConfig = {
//         val props = new Properties()

//         props.put("zookeeper.connect", zookeeper)
//         props.put("group.id", groupId)
//         props.put("zookeeper.session.timeout.ms", "400")
//         props.put("zookeeper.sync.time.ms", "200")
//         props.put("auto.commit.interval.ms", "1000")
 
//         new ConsumerConfig(props)
//     }
// }
