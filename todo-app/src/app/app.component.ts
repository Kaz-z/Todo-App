import { Component, OnInit } from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent implements OnInit {

  // To store todos
  todos: Todo[] = [];

  // Todo counter
  todoCounter: number = 0;

  // To store history of todos
  todosHistory: Todo[] = [];

  constructor(private todoDataService: TodoDataService) {}

  public ngOnInit() {
    this.todoDataService
      .getAllTodos()
      .subscribe(
      (todos) => {
        this.todos = todos;
      }
      );
  }

  onAddTodo(todo) {
    this.todoDataService
      .addTodo(todo)
      .subscribe(
      (newTodo) => {
        this.todos = this.todos.concat(newTodo);
        this.todosHistory = this.todosHistory.concat(newTodo);
      }
      );
  }

  onToggleTodoComplete(todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
      (updatedTodo) => {
        todo = updatedTodo;
        this.todoCounter++;
      }
      );
  }

  onRemoveTodo(todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
      (_) => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
      }
      );
  }

  getStyle() {
    if(this.todos.length > 0) {
      return "#ffb41e";
    }

    else {
      return "#42f445";
    }
  }

}
