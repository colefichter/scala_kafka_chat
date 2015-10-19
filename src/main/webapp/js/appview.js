define([
  'jquery',
  'underscore',
  'backbone',
  'layout',
  'text!../templates.html'
], function($, _, Backbone, Layout, templates){

    //Global state is ugly, but this is just a simple example to learn about Kafka... we can cut some corners here.
    var loginName = null;

    var BaseLayout = Backbone.Layout.extend({
        fetchTemplate: function (selector) {
            var tmpStr = $(templates).filter(selector).html();
            return _.template(tmpStr);
        }
    });

    var NameView = BaseLayout.extend({
        template: "#name_template",

        events: {
          "click #ok": "onOkClick",
          "submit form": "onOkClick"
        },

        afterRender: function () {
            this.$el.find("#name").focus();
        },

        onOkClick: function(e) {
          var name = this.$el.find("#name").val();

          e.preventDefault();

          this.trigger("login", name);
        }
    });

    var Message = Backbone.Model.extend({
      defaults: {
        "topic": "",
        "text": "",
        "sender": ""
      },

      url: "/message",

      cssClass: function () {
        var sender = this.get("sender");

        if (sender === "[system]") {
          return "warning";
        }

        if (sender === loginName) {
          return "success right";
        }

        return "info left";
      }
    });

    var Messages = Backbone.Collection.extend({
      model: Message
    });

    var MessageList = BaseLayout.extend({
      template: "#list_template",

      initialize: function (options) {


        this.appendMessage(loginName + " is now chatting about " + options.topic, "[system]");



        //TODO: need to send TOPIC along with message payload!
        //TODO: remove these test messages after wiring up Kafka
        this.appendMessage("Hi Cole!", "Joe");
        this.appendMessage("Hi Joe! How are you?", "Cole");
      },

      afterRender: function () {
        this.$el.empty();
        this.collection.each(_.bind(this.renderMessage, this));
        this.scrollToBottom();

        return this;
      },

      scrollToBottom: function () {
        var el = $("#messages"); //Don't use this.$el because bootstrap creates an inner div automatically...
        el.scrollTop(el.prop("scrollHeight"));
      },

      renderMessage: function (message) {
        var html = "<div class=\"alert alert-" + message.cssClass() + "\" role=\"alert\"><span class='name'>" + 
              message.get("sender") + ":</span> " + message.get("text") + "</div>";
        this.$el.append(html);
      },

      appendMessage: function (text, sender) {
        var message = new Message({
          topic: $("#topics :selected").val(),
          text: text,
          sender: sender
        });

        this.collection.create(message);        
        this.renderMessage(message);
        this.scrollToBottom();
      }
    });

    var ChatView = BaseLayout.extend({
      template: "#chat_template",

      events: {
        'change #topics': "onTopicChanged",
        'click #send': "onSendMessage",
        'submit form': "onSendMessage"
      },

      initialize: function (options) {
      },

      afterRender: function () {
          var self = this;

          this.$el.find("#message").focus();  
          this.fetchTopics();
      },

      fetchTopics: function () {
        $.get( "/topics")
          .done(_.bind(this.displayTopics, this))
          .fail(_.bind(this.failedToLoadTopics, this));
      },

      displayTopics: function (topics) {
        var list = this.$el.find("#topics");
        list.find("option").remove();

        _.each(topics, function (x) {
          list.append("<option value='" + x +"'>" + x +"</option>");
        });

        list.trigger("change");
      },

      failedToLoadTopics: function (topics) {
        alert("Unable to load the chat topics! Try reloading the page.");
      },

      onTopicChanged: function () {
        var topic = this.$el.find("#topics").val();

        var view = new MessageList({
          collection: new Messages(), 
          topic: topic
        });
        this.setView("#messages", view);
        view.render();
      },

      onSendMessage: function (e) {
        var el = this.$el.find("#message"),
            view = this.getView("#messages");

        e.preventDefault();
        view.appendMessage(el.val(), loginName);
        el.val("").focus();
      }
    });

    var AppView = BaseLayout.extend({
      el: "#appview",

      initialize: function (options) {
        this.setupNameView();
      },

      setupNameView: function () {
        var view = new NameView();
        view.on("login", _.bind(this.doLogin, this));

        this.setView("#main", view);
      },

      doLogin: function (name) {
        loginName = name;
        this.removeView("#main");
        this.setupChatView();
      },

      setupChatView: function () {
        var view = new ChatView();
        this.setView("#main", view);  
        view.render(); //Why do I have to call this manually after changin the view? :(    
      }
    });

    return AppView;
});