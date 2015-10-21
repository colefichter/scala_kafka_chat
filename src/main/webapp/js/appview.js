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

      afterRender: function () {
        this.$el.empty();
        this.collection.each(_.bind(this.renderMessage, this));
        this.scrollToBottom();
      },

      beingPolling: function () {
        console.log("afterRender starting polling")
        _.defer(_.bind(this.pollForMessages, this));
      },

      pollForMessages: function () {
        var self = this,
            continuation = _.bind(this.pollForMessages, this);

        $.get("/messages/" + loginName)
          .done(function(data) { 
            var messages = $.parseJSON(data);

            console.log("Polling complete", messages);
            if (messages.length > 0) {
              _.each(messages, function (x) {
                self.collection.add(new Message(x.value));
              });
              self.render();                
            }

            _.delay(continuation, 1000);
          });
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
          text: text,
          sender: sender
        });
        message.save();
        //this.collection.create(message);        
        this.renderMessage(message);
        this.scrollToBottom();
      }
    });

    var ChatView = BaseLayout.extend({
      template: "#chat_template",

      events: {
        'click #send': "onSendMessage",
        'submit form': "onSendMessage"
      },

      afterRender: function () {
        var view = new MessageList({ collection: new Messages() });
        this.setView("#messages", view);
        view.render();
        view.beingPolling();
        this.$el.find("#message").focus(); 
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
        var self = this;

        $.post("/login/" + loginName)
          .done(function (){
            $(window).unload(_.bind(self.doLogout, self));
            self.removeView("#main");
            self.setupChatView();
          })
          .fail(function () {
            alert("Login failed. Are all four kafka services running?");
          });
      },

      doLogout: function () {
        $.ajax({
            type: 'POST',
            async: false,
            url: '/logout/' + loginName
        });      
      },

      setupChatView: function () {
        var view = new ChatView();
        this.setView("#main", view);  
        view.render(); //Why do I have to call this manually after changin the view? :(    
      }
    });

    return AppView;
});