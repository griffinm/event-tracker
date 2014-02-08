define(
  'collections/EventInstances',
  [
    'backbone',
    'models/EventInstance'
  ],
  function(Backbone){
    'use strict';

    var EventInstanceModel = require('models/EventInstance')

    var exports = Backbone.Collection.extend({

      model: EventInstanceModel,

      url: function(){
        return 'events/' + this.event_id + '/event_instances';
      }

    });

    return exports;
  }
)