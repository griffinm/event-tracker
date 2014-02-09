define(
  'routers/ApplicationRouter',
  [
    'require',
    'backbone',
  ],
  function(require, Backbone){
    'use strict'

    var exports = Backbone.Router.extend({

      activeViews: {
        eventIndex: undefined,
        eventInstances: undefined
      },

      routes: {
        'events'      : 'eventsIndex',
        'events/:event_id/event_instances' : 'eventInstances'
      },

      eventsIndex: function(){
        var that = this;
        require([
          'collections/Events',
          'views/Events'
        ], function(){
          var EventCollection = require('collections/Events'),
            EventsView = require('views/Events'),
            events = new EventCollection();
          
          if(that.activeViews.eventIndex){
            that.activeViews.eventIndex.dispose();
          }
          that.activeViews.eventIndex = new EventsView({collection: events});
        });
      },

      eventInstances: function(eventId){
        var that = this;
        require([
          'collections/EventInstances',
          'views/EventInstances'
        ], function(){
          var EventInstancesCollection = require('collections/EventInstances'),
            collection = new EventInstancesCollection(),
            EventInstancesView = require('views/EventInstances');
         
          if(that.activeViews.eventInstances){
             that.activeViews.eventInstances.dispose();
          }
          that.activeViews.eventInstances = new EventInstancesView({collection: collection});

          collection.event_id = eventId;
          collection.fetch();
        });
      },

      showView: function(view){

      }

    });

    return exports;
  }
);