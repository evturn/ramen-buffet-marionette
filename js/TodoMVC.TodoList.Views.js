TodoMVC.module('TodoList.Views', function(Views, App, Backbone, Marionette, $, _) {

  Views.ItemView = Marionette.ItemView.extend({
    tagName: 'li',
    template: '#template-todoItemView',
    ui: {
      edit: '.edit'
    },
    events: {
      'click .destroy': 'destroy',
      'dblclick label': 'onEditClick',
      'keypress .edit': 'onEditKeypress',
      'blur .edit'    : 'onEditBlur',
      'click .toggle' : 'toggle'
    },
});

  App.vent.on('todoList:filter',function(filter) {
    filter = filter || 'all';
    $('#todoapp').attr('class', 'filter-' + filter);
  });

});