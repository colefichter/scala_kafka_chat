// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min',
    underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
    backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min',
    //text: "https://raw.githubusercontent.com/requirejs/text/master/text",
    text: "text",
    //layout: "https://raw.githubusercontent.com/tbranyen/backbone.layoutmanager/master/backbone.layoutmanager"    
    layout: "backbone.layoutmanager"
  }

});

require([

  // Load our app module and pass it to our definition function
  'app', 'text'
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});