// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'appview'
], function($, _, Backbone, AppView){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    //Router.initialize();
    

    //This app.js file is the bootstrapper. It starts require, and loads our AppView which runs the actual application.
    return new AppView();
  }

  return {
    initialize: initialize
  };
});