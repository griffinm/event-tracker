define(
  'models/EventInstance',
  [
    'backbone',
    'moment'
  ],
  function(Backbone){
    'use strict';

    var moment = require('moment');

    var exports = Backbone.Model.extend({
      url: function(){
        return 'events/'+ this.collection.event_id + '/event_instances/' + (this.attributes.id || '');
      },

      formattedDate: function(format){
        format = format || 'MMMM D, YYYY';
        return moment(this.get('created_at')).format(format);
      },

      formattedTime: function(format){
        format = format || 'LT';
        return moment(this.get('created_at')).format(format);
      }
    });

    return exports;
  }
)