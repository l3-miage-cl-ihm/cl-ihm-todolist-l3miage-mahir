import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';
import { TodoList } from './todolist.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public afs: AngularFirestore) {
      
  }

}


