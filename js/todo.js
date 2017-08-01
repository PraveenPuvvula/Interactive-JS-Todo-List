var todoList = {
	todo : [],
	addTodo: function(todoText){
		this.todo.push({
			completed : false,
			todoText : todoText
		});
	},
	changeTodo: function(index,todoText){
		this.todo[index].todoText = todoText;
	},
	deleteTodo: function(position){
		this.todo.splice(position, 1);
	},
	toggleCompleted: function(position){
		var todos = this.todo[position];
		todos.completed = !todos.completed;
	},
	toggleAll: function(){
		var completedTodo = 0;
		var totalTodo = this.todo.length;
		this.todo.forEach(function(todo){
			if (todo.completed === true) {
				completedTodo++;
			}
		})
		this.todo.forEach(function(todo){
			if (completedTodo === totalTodo) {
				todo.completed = false;
			}
			else{
				todo.completed = true;
			}
		})
}
};

var handlers = {
	addTodo: function(){
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = '';
		view.displayTodo();
	},
	changeTodo: function(){
		var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		var changeTodoTextInput = document.getElementById('changeTodoTextInput');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value = '';
		changeTodoTextInput.value = '';
		view.displayTodo();
	},
	deleteTodo: function(position){
		todoList.deleteTodo(position);
		view.displayTodo();
	},
	toggleCompleted: function(){
		var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
		todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
		toggleCompletedPositionInput.value = '';
		view.displayTodo();
	},
	toggleAll: function(){
		todoList.toggleAll();
		view.displayTodo();
	}
};

var view = {
	displayTodo: function(){
		var todoUl = document.querySelector('ul');
		todoUl.innerHTML = '';
		todoList.todo.forEach(function(todo, position){
			var todoLi = document.createElement('li');
			var todoTextWithCompletion = '';
			if (todo.completed === true) {
				todoTextWithCompletion = '(x) ' + todo.todoText;
			}
			else {
				todoTextWithCompletion = '() ' + todo.todoText;
			}
			todoLi.id = position;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			todoUl.appendChild(todoLi);
		}, this);
	},
	createDeleteButton: function(){
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},
	setUpEventListeners: function(){
		var todoUl = document.querySelector('ul');
		todoUl.addEventListener('click', function(event){
			var elementClicked = event.target;

			if (elementClicked.className === 'deleteButton') {
				handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
			}
		});
	}
};

