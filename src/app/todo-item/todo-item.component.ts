import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditItemDialogComponent } from '../edit-item-dialog/edit-item-dialog.component';
import { TodoItem, TodoList } from '../todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

  @Input() item: TodoItem = {
    label: '',
    isDone: false,
    id: 0
  };
  @Output() update: EventEmitter<TodoItem> = new EventEmitter();
  @Output() remove:  EventEmitter<TodoItem> = new EventEmitter();
  constructor(public dialog: MatDialog) { 
  }

  ngOnInit(): void {
  }

  openDialogEditItem(item :TodoItem){

    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '350px',
      data: item.label,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('The dialog was closed');
      console.log("result: " + result);
      if(result !== undefined){
      let newItem = {label: result, isDone: item.isDone} as TodoItem;
      this.update.emit(newItem); 
      
      }

    });
  }

  updateDoneValue(task: TodoItem, checked: boolean){
    let item = {label: task.label, isDone: checked} as TodoItem;
    console.log(item.isDone);
    this.update.emit(item); 
  }

  
  removeItem(task: TodoItem){
    this.remove.emit(task);
  }

  
}
