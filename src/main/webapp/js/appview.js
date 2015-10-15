define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var AppView = Backbone.View.extend({

    initialize: function (options) {
      console.log("AppView started!");
    }

  });

  return AppView;
});