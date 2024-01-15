import { Injectable } from '@angular/core';
import {observable, BehaviorSubject, Observable} from "rxjs";
import {TodoList} from "../interfaces/todo-list";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private lists: TodoList[] = [];
  private todoSubject = new BehaviorSubject<TodoList[]>([])
  private isEditable = new BehaviorSubject<boolean>(false);
  constructor() { }

  getTodoList(): Observable<TodoList[]> {
    return this.todoSubject.asObservable();
  }

  createTodo(list: TodoList): void{
    list.id = new Date().getTime();
    this.lists.push(list);
    this.todoSubject.next(this.lists);
  }

  deleteTodo(id: number): void{
    this.lists = this.lists.filter(list => list.id !== id);
    this.todoSubject.next(this.lists);
  }

  setEditable(value: boolean){
    this.isEditable.next(value);
  }

  getEditable(){
    return this.isEditable.asObservable();
  }

  updateTodo(todo: TodoList): void{
    const index = this.lists.findIndex((list) => list.id !== todo.id)
    if(index !== -1){
      this.lists[index] = todo;
      this.todoSubject.next(this.lists);
    }
  }

  toggleTodoStatus(id: number): void {
    this.lists = this.lists.map((todo) => {
      if (todo.id === id) {
        todo.status = (todo.status == 1) ? 0 : 1;
      }
      return todo;
    });
    this.todoSubject.next(this.lists);
  }

}
