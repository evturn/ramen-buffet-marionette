TodoMVC.module('Todos', function(Todos, App, Backbone, Marionette, $, _) {

  var localStorageKey = 'ramen-buffet-marionette';

  Todos.Todo = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage(localStorageKey),
    defaults: {
      title: '',
      completed: false,
      created: 0
    },
    initialize: function() {
      if (this.isNew()) {
        this.set('created', Date.now());
      }
    },
    toggle: function() {
      return this.set('completed', !this.isCompleted());
    },
    isCompleted: function() { 
      return this.get('completed'); 
    }
  });

  Todos.TodoList = Backbone.Collection.extend({
    model: Todos.Todo,
    localStorage: new Backbone.LocalStorage(localStorageKey),

  });

});