import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HistoryService } from '../history.service';
import { TodoItem, TodoList, TodolistService } from '../todolist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  public canUndo = false;
  public canRedo = false;
  constructor(public toDoService: TodolistService,  public historyService: HistoryService) { 
    toDoService.observable.subscribe(obs =>{

      this.saveDataLocally(obs);
      
      obs.items.map(e =>console.log(e));
      console.log("Verifie si je peux undo");
      
      this.canRedo = this.historyService.checkIfICanRedo();
      this.canUndo = this.historyService.checkIfICanUndo();
      
    });

    
    
  }

  private saveDataLocally(todoList: TodoList): void{
    console.log("Sauvegarde locale de la todoList");
    sessionStorage.setItem("todoList", JSON.stringify(todoList));
    this.historyService.push(todoList);
  }
  
  onSubmit(task: HTMLInputElement) {
    console.log(task.value);
    //Ajout d'une nouvelle task
    this.toDoService.create(task.value);
    task.value = "";

  }

  updateItem(newItem: TodoItem, item: TodoItem ){
    this.toDoService.update(newItem, item); 
  }

  removeItem(task: TodoItem){
    this.toDoService.delete(task)
  }

  clickUndo(){
    let todo = this.historyService.undo();
    this.toDoService.updateTodoList(todo);
  }

  clickRedo(){
    let todo = this.historyService.redo();
    this.toDoService.updateTodoList(todo);
  }
}
