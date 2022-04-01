import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoList, TodolistService } from './todolist.service';

export interface History<T> { 
  canUndo: boolean; 
  canRedo: boolean; 
  history: T[]; 
  current: T; 
  currentIndex: number;
} 

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private subj = new BehaviorSubject<History<TodoList>>({canUndo: false, canRedo: false, history: [], currentIndex: -1,current: {emoji: "", id:"", description: "", label: 'L3 MIAGE', items: [] }});
  readonly observable = this.subj.asObservable();
  constructor() { }

  undo(){
    if(this.subj.value.currentIndex > 0){
      const newIndex = this.subj.value.currentIndex - 1;
      const currentTodo = this.subj.value.history[newIndex];
      const canUndo = newIndex > 0 ? true : false;
      this.subj.next({...this.subj.value,
        canUndo: canUndo,
        current: currentTodo,
        currentIndex: newIndex})
    }else{
      this.subj.next({...this.subj.value,
        canUndo: false});
    }
  }

  redo(){
    if(this.subj.value.currentIndex < this.subj.value.history.length ){
      const newIndex = this.subj.value.currentIndex + 1;
      const currentTodo = this.subj.getValue().history[newIndex];
      const canRedo = newIndex < this.subj.value.history.length-1 ? true : false;

      this.subj.next({...this.subj.value,
        canRedo: canRedo,
        current: currentTodo,
        currentIndex:newIndex})


    }else{
      this.subj.next({...this.subj.value,
        canRedo: false});
    }

  }


  push(todoList: TodoList){
    console.log("Push !")
    let newHistory = this.subj.value.history;
    newHistory.push(todoList);
    this.subj.next({...this.subj.value,
      canUndo: true,
      history: newHistory,
      current: todoList,
      currentIndex: newHistory.length-1});

  }
}
