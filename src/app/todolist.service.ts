import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TodoItem {
  readonly label: string;
  readonly isDone: boolean;
  readonly id: number;
}

export interface TodoList {
  readonly label: string;
  readonly items: readonly TodoItem[];
}

let idItem = 0;

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private subj = new BehaviorSubject<TodoList>({label: 'L3 MIAGE', items: [] });
  readonly observable = this.subj.asObservable();

  constructor() {

    this.retrieveLocalData();
  }

  create(...labels: readonly string[]): this {
    const L: TodoList = this.subj.value;
    this.subj.next( {
      ...L,
      items: [
        ...L.items,
        ...labels.filter( l => l !== '').map(
            label => ({label, isDone: false, id: idItem++})
          )
      ]
    } );
    return this;
  }

  delete(...items: readonly TodoItem[]): this {
    const L = this.subj.value;
    this.subj.next( {
      ...L,
      items: L.items.filter(item => items.indexOf(item) === -1 )
    } );
    return this;
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]): this {
    
    if(data.label !== "") {
      
      const L = this.subj.value;
      this.subj.next( {
        ...L,
        items: L.items.map( item => items.indexOf(item) >= 0 ? {...item, ...data} : item )
        
      } );
    } else {

      this.delete(...items);
      
    }
    return this;
  }

  private retrieveLocalData(){
    console.log("Récupération des données sauvegardées en local")
    let myLocalData = sessionStorage.getItem("todoList") as string;
    
    let myLocalTodoList: TodoList = JSON.parse(myLocalData);

    if(myLocalTodoList)
      this.subj.next(myLocalTodoList);
    
  }

  updateTodoList(todoList: TodoList){
    if(todoList)
      this.subj.next(todoList);
  }

  

}
