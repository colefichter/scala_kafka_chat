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