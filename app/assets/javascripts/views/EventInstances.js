define(
  'views/EventInstances',
  [
    'backbone',
    'text!templates/EventInstances.html',
    'models/EventInstance',
    'moment'
  ],
  function(Backbone){
    'use strict';

    var template = require('text!templates/EventInstances.html'),
      EventInstanceModel = require('models/EventInstance'),
      Moment = require('moment');


    var exports = Backbone.View.extend({
      el: $('#content-container'),
      template: _.template(template),
      collectionFetched: false,
      modelFetched: false,
      addingNew: false,
      activeFilter: '',
      startDate: '',
      endDate: '',

      events: {
        'click .create-instance' : 'createInstance',
        'click label.filter' : 'changeFilter'
      },

      initialize: function(){
        this.activeFilter = 'label.all';

        this.listenTo(this.collection, 'sync', this.completeCollectionFetch);
        this.listenTo(this.model, 'sync', this.completeModelFetch);
      },

      changeFilter: function(e){
        var item = $(e.target);
        
        if(item.hasClass('month')){
          this.activeFilter = 'label.month';
          this.displayedDays = undefined;
          this.endDate = Moment().format();
          this.startDate = Moment().startOf('month').subtract(1, 'days').format();
        }
        if(item.hasClass('all')){
          this.activeFilter = 'label.all';
          this.displayedDays = undefined;
          this.endDate = '';
          this.startDate = '';       
        }
        if(item.hasClass('last30')){
          this.activeFilter = 'label.last30';
          this.endDate = Moment().format();
          this.startDate = Moment().subtract(30, 'days').format();
        }
        if(item.hasClass('last7')){
          this.activeFilter = 'label.last7';
          this.endDate = Moment().format();
          this.startDate = Moment().subtract(7, 'days').format();
        }

        this.collection.fetch({data: {start_date: this.startDate, end_date: this.endDate}});
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
        var sortedCollection = this.sortedCollection(),
          displayedDays = Moment(this.endDate).dayOfYear() - Moment(this.startDate).dayOfYear(),
          totalEvents = sortedCollection.length;
          
        if(this.addingNew){
          sortedCollection = sortedCollection.map(function(item){
            item.customCss = '';
            item.isNewItem = false;
            return item;
          });
          sortedCollection[0].isNewItem = true;
          sortedCollection[0].customCss = 'alert alert-success fade in';
        }

        var html = this.template({
          eventInstances: sortedCollection,
          event: this.model,
          total: totalEvents,
          displayedDays: displayedDays,
          percentage: ((totalEvents / displayedDays) * 100).toFixed(1)
        });

        this.$el.html(html);
        this.addingNew = false;

        this.$el.find(this.activeFilter).addClass('active');

        return this.$el;
      },

      sortedCollection: function(){
        return this.collection.sortBy(function(item){
          return item.get('created_at');
        }).reverse();
      },

      createInstance: function(){
        this.addingNew = true;
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