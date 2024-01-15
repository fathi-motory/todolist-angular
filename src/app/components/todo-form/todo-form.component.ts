import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {Form, FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {TodoList} from "../../interfaces/todo-list";
import {TodoListService} from "../../services/todo-list.service";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent implements OnInit, OnChanges{
  todoList!: FormGroup;
  isEdit!: boolean;
  @Input() selectedTodo!: TodoList;
  constructor(private  TodoListService: TodoListService, private formBuilder: FormBuilder) {
    this.TodoListService.getEditable().subscribe({
      next: (response) => (this.isEdit = response)
    });
  }
  ngOnInit(): void{
    this.todoList = this.formBuilder.group({
      id: new Date().getTime(),
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectedTodo']?.currentValue){
      const value = changes['selectedTodo']?.currentValue;
      this.todoList.patchValue({
        id: value.id,
        title: value.title,
        description: value.description,
        status: value.status
      })
    }
  }

  reset():void{
    this.todoList.reset();
    this.TodoListService.setEditable(false);
  }

  onSubmit():void{
    if(this.todoList.invalid){
      return;
    }
    const todo: TodoList = this.todoList.value;
    if(this.isEdit){
      this.TodoListService.updateTodo(todo);
      this.TodoListService.setEditable(false);
    }
    else{
      this.TodoListService.createTodo(todo);
    }
    this.reset();
  }
}
