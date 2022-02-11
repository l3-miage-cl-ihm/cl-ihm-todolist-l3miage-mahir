import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { TodoItem, TodoList, TodolistService } from './todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'l3m-tpX-todolist-angular-y2022';

  

  constructor(public toDoService: TodolistService){
    toDoService.observable.subscribe(obs =>{
      this.saveDataLocally(obs);
      
    });
    
    this.retrieveLocalData();
  }

  private saveDataLocally(todoList: TodoList): void{
    console.log("Sauvegarde locale de la todoList");
    console.log("Obtention en json: "+ JSON.stringify(todoList));
    localStorage.removeItem("todoList");
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  private retrieveLocalData(){

    console.log("Récupération des données sauvegardées en local")
    let myLocalData = localStorage.getItem("todoList") as string;
    let myLocalTodoList: TodoList = JSON.parse(myLocalData);
    console.log("Mes données local en string : " +myLocalData);
    console.log("items: " + myLocalTodoList.items);
    console.log("label: " + myLocalTodoList.label);

    
    this.toDoService.observable.pipe(tap(todoList => {
      todoList = myLocalTodoList;
    }));
    
  }

  onSubmit(task: HTMLInputElement) {
    console.log(task.value);
    //Ajout d'une nouvelle task
    let newTask = this.toDoService.create(task.value);
    task.value = "";

  }
  updateTask(task: TodoItem){
    this.toDoService.update(task);    
  }
}


