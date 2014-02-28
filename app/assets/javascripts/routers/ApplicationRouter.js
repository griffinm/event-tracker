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
          'views/EventInstances',
          'models/Event',
          'moment'
        ], function(){
          var EventInstancesCollection = require('collections/EventInstances'),
            collection = new EventInstancesCollection(),
            EventInstancesView = require('views/EventInstances'),
            EventModel = require('models/Event'),
            Moment = require('moment'),
            eventModel = new EventModel({id: eventId}),
            startDate = Moment().startOf('month').format(),
            endDate = Moment().format();

          if(that.activeViews.eventInstances){
             that.activeViews.eventInstances.dispose();
          }
          that.activeViews.eventInstances = new EventInstancesView({
            collection: collection,
            model: eventModel
          });
          that.activeViews.eventInstances.startDate = startDate;
          that.activeViews.eventInstances.endDate = endDate;
          
          collection.event_id = eventId;

          eventModel.fetch();
          collection.fetch({
            data: {
              start_date: startDate,
              end_date: endDate
            }
          });
        });
      },

      showView: function(view){

      }

    });

    return exports;
  }
);