'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const parseTodoList = function () {
  if (localStorage.length > 0) {
    toDoData = JSON.parse(localStorage.getItem('safeTodoList'));
    render();
  }
};

//localStorage.clear();

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';

  localStorage.setItem('safeTodoList', JSON.stringify(toDoData));

  toDoData.forEach(function (item) {
    const li = document.createElement('li');

    li.classList.add('todo-item');

    li.innerHTML = `<span class="text-todo"> ${item.text} </span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>`;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });

    li.querySelector('.todo-remove').addEventListener('click', function () {
      const indexNewToDo = toDoData.indexOf(item);
      toDoData.splice(indexNewToDo, 1);
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  if (headerInput.value === '') {
    alert('Вы не заполнили дело!');
  } else {
    toDoData.push(newToDo);
    headerInput.value = '';
    render();
  }

  console.log(newToDo);
  console.log(toDoData);
});

parseTodoList();
