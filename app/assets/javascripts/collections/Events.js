define(
  'collections/Events',
  [
    'backbone'
  ],
  function(Backbone){
    'use strict';

    var exports = Backbone.Collection.extend({
      
      url: '/events',

      initialize: function(){

      }
      
    });

    return exports;
  }
);