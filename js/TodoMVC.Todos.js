TodoMVC.module('Todos', function(Todos, App, Backbone, Marionette, $, _) {

  var localStorageKey = 'ramen-buffet-marionette';

  Todos.Todo = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage(localStorageKey),
    defaults: {
      title: '',
      completed: false,
      created: 0
    },

  });


});