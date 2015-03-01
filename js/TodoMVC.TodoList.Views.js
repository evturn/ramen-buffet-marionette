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
    initialize: function() {
      this.bindTo(this.model, 'change', this.render, this);
    },
    onRender: function() {
      this.$el.removeClass( 'active completed' );
      if ( this.model.get( 'completed' )) {
        this.$el.addClass( 'completed' );
      } else { 
        this.$el.addClass( 'active' );
      }
    },
    destroy: function() {
      this.model.destroy();
    },
    toggle: function() {
      this.model.toggle().save();
    },
    onEditClick: function() {
      this.$el.addClass('editing');
      this.ui.edit.focus();
    },
    updateTodo : function() {
      var todoText = this.ui.edit.val();
      if (todoText === '') {
        return this.destroy();
      }
      this.setTodoText(todoText);
      this.completeEdit();
    },
    onEditBlur: function(e){
      this.updateTodo();
    },
    onEditKeypress: function(e) {
      var ENTER_KEY = 13;
      var todoText = this.ui.edit.val().trim();
      if ( e.which === ENTER_KEY && todoText ) {
        this.model.set('title', todoText).save();
        this.$el.removeClass('editing');
      }
    },
    setTodoText: function(todoText){
      if (todoText.trim() === ""){ return; }
      this.model.set('title', todoText).save();
    },
    completeEdit: function(){
      this.$el.removeClass('editing');
    },
  });

  Views.ListView = Backbone.Marionette.CompositeView.extend({
    template: '#template-todoListCompositeView',
    childView: Views.ItemView,
    childViewContainer: '#todo-list',

  });

  App.vent.on('todoList:filter',function(filter) {
    filter = filter || 'all';
    $('#todoapp').attr('class', 'filter-' + filter);
  });

});