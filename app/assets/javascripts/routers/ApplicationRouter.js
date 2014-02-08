define(
  'routers/ApplicationRouter',
  [
    'require',
    'backbone'
  ],
  function(require, Backbone){
    'use strict'

    var exports = Backbone.Router.extend({

      routes: {
        'events'      : 'eventsIndex',
        'events/:id'  : 'eventShow',
        'events/:event_id/event_instances' : 'eventInstances'
      },

      eventsIndex: function(){
        require([
          'collections/Events',
          'views/Events'
        ], function(){
          var EventCollection = require('collections/Events'),
            EventsView = require('views/Events'),
            events = new EventCollection(),
            eventsView = new EventsView({collection: events});  
        });
      },

      eventShow: function(id){

      },

      eventInstances: function(eventId){
        require([
          'collections/EventInstances',
          'views/EventInstances'
        ], function(){
          var EventInstancesCollection = require('collections/EventInstances'),
            collection = new EventInstancesCollection(),
            EventInstancesView = require('views/EventInstances'),
            view = new EventInstancesView({collection: collection});

            collection.event_id = eventId;
            collection.fetch();
        });
      }

    });

    return exports;
  }
);