import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { EditItemDialogComponent } from './edit-item-dialog/edit-item-dialog.component';
import { HistoryService } from './history.service';
import { TodoItem, TodoList, TodolistService } from './todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'l3m-tpX-todolist-angular-y2022';

  canUndo = false;
  canRedo = false;

  constructor(public toDoService: TodolistService, public historyService: HistoryService,
    public dialog: MatDialog){

    toDoService.observable.subscribe(obs =>{

      this.saveDataLocally(obs);
      
      obs.items.map(e =>console.log(e));
      this.canRedo = this.historyService.checkIfICanRedo();
      this.canUndo = this.historyService.checkIfICanUndo();
      
    });
    
  }

  private saveDataLocally(todoList: TodoList): void{
    console.log("Sauvegarde locale de la todoList");
    sessionStorage.setItem("todoList", JSON.stringify(todoList));
    this.historyService.push(todoList);
  }

  undoClick(){
    //this.toDoService.updateTodoList(this.historyService.undo());
  }
  
  redoClick(){
    //this.toDoService.updateTodoList(this.historyService.redo());

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
      this.toDoService.update(newItem, item); 
      }

    });
  }

  onSubmit(task: HTMLInputElement) {
    console.log(task.value);
    //Ajout d'une nouvelle task
    this.toDoService.create(task.value);
    task.value = "";

  }
  updateDoneValue(task: TodoItem, checked: boolean){
    let item = {label: task.label, isDone: checked} as TodoItem;

    console.log(item.isDone);
    this.toDoService.update(item, task); 
  }

  removeItem(task: TodoItem){
    this.toDoService.delete(task)
  }
}




