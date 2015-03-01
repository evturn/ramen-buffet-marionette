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
});