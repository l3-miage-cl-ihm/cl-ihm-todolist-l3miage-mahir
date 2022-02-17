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
    
    let newCurrentTodo: TodoList = {label: 'L3 MIAGE', items: [] };
    if(this.checkIfICanUndo()){
      //Récupérer toutes les datas précédentes.
      let lastHistory: TodoList[] = [];
      let lastCurrentIndex = 0;
      this.subj.subscribe(obs => {
        lastHistory = obs.history
        lastCurrentIndex = obs.currentIndex;
        newCurrentTodo = obs.history[lastCurrentIndex - 1];
      }).unsubscribe();

      //Ajouter les datas précentes 
      let history: History<TodoList> = {canUndo: this.checkIfICanUndo(), canRedo: this.checkIfICanRedo(), history: lastHistory,currentIndex: lastCurrentIndex, current: newCurrentTodo };
      this.subj.next(history);
      return newCurrentTodo;
    }
    return newCurrentTodo;
  }

  redo(): TodoList{
    let newCurrentTodo: TodoList = {label: 'L3 MIAGE', items: [] };
    if(this.checkIfICanUndo()){
      //Récupérer toutes les datas précédentes.
      let lastHistory: TodoList[] = [];
      let lastCurrentIndex = 0;
      this.subj.subscribe(obs => {
        lastHistory = obs.history
        lastCurrentIndex = obs.currentIndex;
        newCurrentTodo = obs.history[lastCurrentIndex + 1];
      }).unsubscribe();

      //Ajouter les datas précentes 
      let history: History<TodoList> = {canUndo: this.checkIfICanUndo(), canRedo: this.checkIfICanRedo(), history: lastHistory,currentIndex: lastCurrentIndex, current: newCurrentTodo };
      this.subj.next(history);
    }
    return newCurrentTodo;
  }

  /**
   *  Ajouter une todolist a notre historique
   *  Supprimer toutes les datas supérieur à l'index courant.
   **/
  push(todoList: TodoList){
    
    this.subj.subscribe(obs =>
        obs.history.filter((_, index) => index > obs.currentIndex)
    );
    this.subj.subscribe(obs=> {
      
      obs.history.push(todoList);
      obs.currentIndex = obs.currentIndex+1;
      obs.current = todoList;
      
    }).unsubscribe;
  }

  checkIfICanUndo(): boolean{
    let canUndo = false;
    this.subj.subscribe((obs)=>{
    canUndo = obs.currentIndex !== obs.history.length-1;
     console.log("can undo: "+ obs.history.length);
  }).unsubscribe;
    console.log("can undo: "+canUndo);
    
    return canUndo;
  }

  checkIfICanRedo(): boolean{
    let canRedo = false;
    this.subj.subscribe((obs)=>
    canRedo = obs.currentIndex !== 0).unsubscribe;
    return canRedo;
  }
}
