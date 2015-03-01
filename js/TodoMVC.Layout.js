TodoMVC.module('Layout', function(Layout, App, Backbone, $, _) {
	
	Layout.Header = Backbone.Marionette.ItemView.extend({
		template: '#template-header',
		ui: {
			input: '#new-todo'
		},
		events: {
			'keypress #new-todo' : 'onInputKeypress',
		},
	  onInputKeypress: function(e) {
	    var ENTER_KEY = 13;
	    var todoText = this.ui.input.val().trim();
	    if ( e.which === ENTER_KEY && todoText ) {
	      this.collection.createTodo({
	      	title: todoText
	      });
	      this.ui.input.val('');
	    }
	  },
	  completeAdd: function() {
	    this.ui.input.val('');
	  },
	  createTodo: function(todoText) {
		  if (todoText.trim() === ""){ return; }

		  this.collection.create({
		    title: todoText
		  });

		  this.completeAdd();
		}
	});


	Layout.Footer = Marionette.Layout.extend({
		template: '#template-footer',
		ui: {
			count 		 : '#todo-count strong',
      filters 			 : "#filters a"
    },
    events: {
      "click #clear-completed" : "onClearClick"
    },
    initialize: function() {
      this.bindTo(App.vent, "todoList:filter", this.updateFiltersSelection, this);
      this.bindTo(this.collection, 'all', this.updateCount, this);
    },
    onRender: function() {
      this.updateCount();
    },
    updateCount: function() {
      var activeCount = this.collection.getActive().length,
      completedCount = this.collection.getCompleted().length;
      this.ui.todoCount.html(activeCount);
      this.ui.todoCountLabel.html(activeCount === 1 ? 'item' : 'items');
      this.ui.clearCount.html(completedCount === 0 ? '' : '(' + completedCount + ')');
    },
		updateFilterSelection : function(filter) {
			this.ui.filters
				.removeClass('selected')
				.filter('[href="#' + filter + '"]')
				.addClass('selected');
		},
    onClearClick: function() {
      var completed = this.collection.getCompleted();
      completed.forEach(function destroy(todo) {
        todo.destroy();
      });
    },
  });

});