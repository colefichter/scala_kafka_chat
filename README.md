# scala_kafka_chat

Learning Scala and Kafka by building a chat system.

# Dependencies & Running It

Install scala and sbt: http://scalatra.org/2.4/getting-started/installation.html

Install the confluent.io stream data platform: http://docs.confluent.io/1.0.1/installation.html

Start the confluent services in a bunch of terminals: http://docs.confluent.io/1.0.1/quickstart.html

Be sure to start the Rest Proxy API too! http://docs.confluent.io/1.0.1/kafka-rest/docs/intro.html#installation

Start the scala servlet in a terminal:

```
> ./sbt
> ~container:start
```

Now visit [http://localhost:8080](http://localhost:8080)

# Architecture of the project

This project is a very simple chat client that uses Apache Kafka as a backing store and messaging system. The front-end has been kept simple in order to focus on learning about Kafka.

The front-end is a rich JavaScript UI built with:

* Require.js
* JQuery
* Backbone.js
* Underscore.js
* Backbone Layout Manager
* Bootstrap CSS

The web application is a scalatra servlet written in Scala.

To reduce the complexity of building stateful Kafka consumers, we're using the Confluent REST proxy API to produce and consume messages.
