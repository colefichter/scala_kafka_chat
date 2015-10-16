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

        initialize: function (options) {
            console.log("NameView created");
        }
    });


    var AppView = BaseLayout.extend({
        el: "#appview",

        initialize: function (options) {
          console.log("AppView started!");

          this.setView("#main", new NameView());
        },

        afterRender: function () {
            this.$el.find("#name").focus();
        }

    });

    return AppView;
});