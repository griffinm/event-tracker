define(
  'views/Event',
  [
    'backbone',
    'moment',
    'text!templates/Event.html',
    'models/EventInstance'
  ],
  function(Backbone){
    'use strict';
    var EventTemplate = require('text!templates/Event.html');
    var EventInstance = require('models/EventInstance');
    var moment = require('moment');

    var exports = Backbone.View.extend({
      template: _.template(EventTemplate),
      el: $('#content-container'),

      events: {
        'click .button-track' : 'trackEvent'
      },

      initialize: function(){
        this.listenTo(this.model, 'sync', this.render);
      },

      render: function(){
        var html = this.template({'event': this.model.attributes});
        this.$el.html(html);

        return this;
      },

      trackEvent: function(){
        var eventInstance = new EventInstance();
        eventInstance.event = this.model;
        eventInstance.save();
      }

    });

    return exports;

  }
);