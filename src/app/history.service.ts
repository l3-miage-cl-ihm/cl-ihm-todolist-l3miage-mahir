import { Injectable } from '@angular/core';
import { BehaviorSubject, last } from 'rxjs';
import { TodoList } from './todolist.service';

export interface History<T> { 
  canUndo: boolean; 
  canRedo: boolean; 
  history: T[]; 
  currentIndex: number; 
  current: T; 
} 

@Injectable({
  providedIn: 'root'
})

export class HistoryService {
  private subj = new BehaviorSubject<History<TodoList>>({canUndo: false, canRedo: false, history: [], currentIndex: history.length, current: {label: 'L3 MIAGE', items: [] }});
  readonly observable = this.subj.asObservable();
  constructor() {

  }

  undo(): TodoList{
    let todo: TodoList = {label: 'L3 MIAGE', items: [] };
    this.subj.subscribe(obs =>{
      obs.currentIndex--;
      obs.current = obs.history[obs.currentIndex]
      todo = obs.current;
    }
    ).unsubscribe();
    return todo;
  }

  redo(): TodoList{
    let todo: TodoList = {label: 'L3 MIAGE', items: [] };
    this.subj.subscribe(obs =>{
      obs.currentIndex++;
      obs.current = obs.history[obs.currentIndex]
      todo = obs.current;
      
    }
    );
    return todo;
  }

  /**
   *  Ajouter une todolist a notre historique
   *  Supprimer toutes les datas supérieur à l'index courant.
   **/
  push(todoList: TodoList){
    this.subj.subscribe(obs=> {
      console.log("J'ajoute une todo dans mon history");
      obs.history.push(todoList);
      obs.currentIndex = obs.currentIndex++;
      obs.current = todoList;
    }).unsubscribe;
  }

  checkIfICanUndo(): boolean{

    let canUndo = false;
    this.subj.subscribe(obs=> {
      if(obs.history.length > 0){
        canUndo = true;
      }
    }).unsubscribe;
    return canUndo;
  }

  checkIfICanRedo(): boolean{
    let canRedo = false;
    this.subj.subscribe(obs=> {
      if(obs.history.length > 0 && obs.currentIndex !== obs.history.length){
        canRedo = true;
      }
    }).unsubscribe;
    return canRedo;
  }
}
