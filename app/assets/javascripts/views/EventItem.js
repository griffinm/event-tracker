define(
  'views/EventItem',
  [
    'backbone',
    'text!templates/EventItem.html'
  ],
  function(Backbone){
    'use strict';
    var eventItemTemplate = require('text!templates/EventItem.html');

    var exports = Backbone.View.extend({
      template: _.template(eventItemTemplate),
      tagName: 'li',
      className: 'event-item',

      initialize: function(){

      },

      render: function(){
        var html = this.template({event: this.model.attributes});
        this.$el.html(html);
        return this;
      }
    });

    return exports;
  }
);