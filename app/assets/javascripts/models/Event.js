define(
  'models/Event',
  [
    'backbone'
  ],
  function(Backbone){
    'use strict';

    var exports = Backbone.Model.extend({

      url: function(){
        return 'events/' + (this.attributes.id || '');
      },

      initialize: function(){

      },

      render: function(){

      }

    });

    return exports;

  }
);