import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoList } from 'src/app/shared/services/todolist.service';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<CreateComponent>,
    public afs: AngularFirestore) { }

  ngOnInit(): void {
  }

 
  toggled: boolean = false;
  message: string = '😊';

  handleSelection(event: any) {
    console.log(event.char);
    this.message = event.char;
  }

  creerTodoList(nom: string, description: string){
    console.log("Création d'une nouvelle todolist");
    const user: User = JSON.parse(localStorage.getItem('user')!);
    const id = this.afs.createId();
    const todolist: TodoList = {id: id, label: nom, description: description, emoji: this.message, items: []}
    this.afs.collection("tasks").doc(id).set(todolist);
    user.todolists.push(todolist.id);
    this.afs.collection("users").doc(user.uid).set(user, {merge: true});
    this.dialogRef.close();
  }
}
