require.config({
  baseUrl: "/assets",
  paths: {
    text:"requirejs-text/text",
    jquery: 'jquery/jquery.min',
    underscore: 'underscore/underscore-min',
    backbone: 'backbone/backbone-min'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    }
  }
});