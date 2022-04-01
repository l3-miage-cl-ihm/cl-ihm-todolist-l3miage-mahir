import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

export interface TodoItem {
  readonly label: string;
  readonly isDone: boolean;
  readonly id: number;
}

export interface TodoList {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly emoji: string;
  readonly items: readonly TodoItem[];
}

let idItem = 0;

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private subj = new BehaviorSubject<TodoList>({id:"", label: 'L3 MIAGE',  description: 'Pour les L3 MIAGE est pas plus=', emoji: '😊', items: [] });
  readonly observable = this.subj.asObservable();

  constructor(public afs: AngularFirestore) {
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
    //this.afs.doc<TodoList>("tasks/"+L.id).set(L, {merge: true});
    return this;
  }

  delete(...items: readonly TodoItem[]): this {
    const L = this.subj.value;
    this.subj.next( {
      ...L,
      items: L.items.filter(item => items.indexOf(item) === -1 )
    } );
    //this.afs.doc<TodoList>("tasks/"+L.id).set(L, {merge: true});

    return this;
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]): this {
    
    if(data.label !== "") {
      const L = this.subj.value;
      this.subj.next( {
        ...L,
        items: L.items.map( item => items.indexOf(item) >= 0 ? {...item, ...data} : item )
        
      } );
      //this.afs.doc<TodoList>("tasks/"+L.id).set(L, {merge: true});

    } else {
      this.delete(...items);
    }

    
    return this;
  }


  updateLabel(label: string){
    const L = this.subj.value;
    this.subj.next( {
      ...L,
      label: label
    } );

  }
  updateTodoList(todoList: TodoList){
    this.subj.next(todoList);
        
    console.log("Ajout de la todolist push !");
  }

 
  

}