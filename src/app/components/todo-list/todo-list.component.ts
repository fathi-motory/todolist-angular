import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {TodoList} from "../../interfaces/todo-list";
import {TodoListService} from "../../services/todo-list.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{
  lists: TodoList[] = [];
  @Output() selectedTodo = new EventEmitter<TodoList>();

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.todoListService.getTodoList().subscribe((lists: TodoList[]) => {
      this.lists = lists;
    })
  }

  editTodo(todo: TodoList): void{
    this.selectedTodo.emit(todo);
    this.todoListService.setEditable(true);
  }

  deleteTodo(id: number): void{
    this.todoListService.deleteTodo(id);
  }

  toggleStatusTodo(id: number): void{
    this.todoListService.toggleTodoStatus(id);
  }
}
