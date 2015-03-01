TodoMVC.module('Layout', function(Layout, App, Backbone, $, _) {
	template: '#template-header',
	ui: {
		input: '#new-todo'
	},
	events: {
		'keypress #new-todo' : 'onInputKeypress',
		'blur #new-todo'		 : 'onTodoBlur'
	},
	onTodoBlur: function() {
		var todoText = this.ui.input.val().trim();
		this.createTodo(todoText);
	},
  onInputKeypress: function(e) {
    var ENTER_KEY = 13;
    var todoText = this.ui.input.val().trim();
    if ( e.which === ENTER_KEY && todoText ) {
      this.createTodo(todoText);
    }
  },
});