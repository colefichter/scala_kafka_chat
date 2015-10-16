define([
  'jquery',
  'underscore',
  'backbone',
  'layout',
  'text!../templates.html'
], function($, _, Backbone, Layout, templates){

    var BaseLayout = Backbone.Layout.extend({
        //manage: true,

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

        initialize: function (options) {
            console.log("NameView created");
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

    var ChatView = BaseLayout.extend({
      template: "#chat_template",

      events: {

      },

      initialize: function (options) {
        console.log("ChatView created");
      },

      afterRender: function () {
          var self = this;

          this.$el.find("#message").focus();  
          this.fetchTopics();
      },

      fetchTopics: function () {
        console.log("Fetching topics");
        
        $.get( "/topics")
          .done(_.bind(this.displayTopics, this))
          .fail(_.bind(this.failedToLoadTopics, this));
      },

      displayTopics: function (topics) {
        console.log("TOPICS", topics);

        var list = this.$el.find("#topics");
        list.find("option").remove();

        _.each(topics, function (x) {
          list.append("<option value='" + x +"'>" + x +"</option>");
        });
      },

      failedToLoadTopics: function (topics) {
        alert("Unable to load the chat topics! Try reloading the page.");
      }
    });

    var AppView = BaseLayout.extend({
      el: "#appview",

      initialize: function (options) {
        console.log("AppView started!");

        this.setupNameView();
      },

      setupNameView: function () {
        var view = new NameView();
        view.on("login", _.bind(this.doLogin, this));

        this.setView("#main", view);
      },

      doLogin: function (name) {
        // var self = this,
        //     loginView = this.getView("#main");

        // loginView.$el.fadeOut(250, function () {
        //   self.$el.find("#main").show();
        // });

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