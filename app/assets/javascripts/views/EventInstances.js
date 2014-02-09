define(
  'views/EventInstances',
  [
    'backbone',
    'text!templates/EventInstances.html',
    'models/EventInstance'
  ],
  function(Backbone){
    'use strict';

    var template = require('text!templates/EventInstances.html'),
      EventInstanceModel = require('models/EventInstance');

    var exports = Backbone.View.extend({
      el: $('#content-container'),
      template: _.template(template),
      collectionFetched: false,
      modelFetched: false,

      events: {
        'click .create-instance' : 'createInstance'
      },

      initialize: function(){
        this.listenTo(this.collection, 'sync', this.completeCollectionFetch);
        this.listenTo(this.model, 'sync', this.completeModelFetch);
      },

      completeCollectionFetch: function(){
        this.collectionFetched = true;
        if(this.collectionFetched && this.modelFetched){
          this.render();
        }
      },

      completeModelFetch: function(){
        this.modelFetched = true;
        if(this.collectionFetched && this.modelFetched){
          this.render();
        }
      },

      render: function(){
        var sortedCollection = this.collection.sortBy(function(item){
          item.get('created_at');
        }).reverse();

        var html = this.template({
          eventInstances: sortedCollection,
          event: this.model
        });
        this.$el.html(html);

        return this.$el;
      },

      createInstance: function(){
        this.collection.create({
          event_id: this.collection.event_id}
        );
      },

      dispose: function(){
        this.$el.empty();
        this.undelegateEvents();
        return this;
      }

    });

    return exports;
  }
)