define(
  'routers/ApplicationRouter',
  [
    'require',
    'backbone',
    'collections/Events',
    'views/Events'
  ],
  function(require, Backbone){
    'use strict'

    var exports = Backbone.Router.extend({

      routes: {
        'events'      : 'eventsIndex',
        'events/:id'  : 'eventShow'
      },

      eventsIndex: function(){
        var EventCollection = require('collections/Events'),
          EventsView = require('views/Events'),
          events = new EventCollection(),
          eventsView = new EventsView({collection: events});
      },

      eventShow: function(id){
        
      }

    });

    return exports;
  }
);