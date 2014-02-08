require.config({
  baseUrl: "/assets",
  paths: {
    text:"requirejs-text/text",
    underscore: 'underscore/underscore-min',
    backbone: 'backbone/backbone-min',
    moment: 'moment/min/moment.min'
  },
  shim: {
    backbone: {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    moment: {
      exports: 'moment'
    }
  }
});