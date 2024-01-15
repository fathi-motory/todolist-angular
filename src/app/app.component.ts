import { Component } from '@angular/core';
import {TodoList} from "./interfaces/todo-list";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-list';
  selectedTodo!: TodoList;
  selectTodo(todo: TodoList){
    this.selectedTodo = todo;
  }
}
