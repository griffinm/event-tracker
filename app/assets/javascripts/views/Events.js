define(
  'views/Events',
  [
    'backbone',
    'require',
    'text!templates/EventsCollection.html',
    'views/EventItem'
  ],
  function(Backbone){
    'use strict';

    var eventsTemplate = require('text!templates/EventsCollection.html'),
      EventItemView = require('views/EventItem');

    var exports = Backbone.View.extend({
      template: _.template(eventsTemplate),
      el: $('#content-container'),

      initialize: function(){
        var that = this;
        this.collection.fetch();
        this.render();

        this.listenTo(this.collection, 'add', this.addOne);
      },

      addOne: function(item){
        var view = new EventItemView({model: item});
        this.$el.find('.events-container').append(view.render().$el);
      },

      render: function(){
        var html = this.template({events: this.collection.models});
        this.$el.html(html);

        return this.$el;
      },

      dispose: function(){
        this.$el.empty();
        this.undelegateEvents();
        return this;
      }

    });

    return exports;
  }
);