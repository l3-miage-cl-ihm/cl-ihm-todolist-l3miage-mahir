import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from 'src/app/shared/services/todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() item: TodoItem = {
    label: '',
    isDone: false,
    id: 0
  };
  @Output() update: EventEmitter<TodoItem> = new EventEmitter();
  @Output() remove:  EventEmitter<TodoItem> = new EventEmitter();
  constructor() { 
  }

  ngOnInit(): void {
  }

  openDialogEditItem(item :TodoItem){


  }

  updateDoneValue(task: TodoItem, checked: boolean){
    console.log("isdone ? = "+checked)
    let item = {id: task.id, label: task.label, isDone: checked} as TodoItem;
    this.update.emit(item); 
  }

  updateLabel(task: TodoItem, newLabel: string){
    let item = {id: task.id, label: newLabel, isDone: task.isDone} as TodoItem;
    this.update.emit(item); 
  }

  
  removeItem(task: TodoItem){
    this.remove.emit(task);
  }

  
}
