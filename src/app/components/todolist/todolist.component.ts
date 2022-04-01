import { ChangeDetectionStrategy, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { TodoItem, TodoList, TodolistService } from 'src/app/shared/services/todolist.service';
import { map } from 'rxjs/operators';
import { HistoryService } from 'src/app/shared/services/history.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';


type FctFilter = (item: TodoItem) => boolean;

interface TodoListPlus extends TodoList {
    remaining: number,
    filter: FctFilter,
    displayedItems: readonly TodoItem[],
    allIsDone: boolean,
};

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TodolistComponent{


  readonly fAll: FctFilter = () => true;
  readonly fCompleted: FctFilter = (item) => item.isDone;
  readonly fActive: FctFilter = (item) => !item.isDone;
  private fCurrent = new BehaviorSubject<FctFilter>(this.fAll);
  readonly todoObs: Observable<TodoListPlus>;
  public user: User;
  readonly obsAllLists: Observable<unknown[]>;
  allUserTodolists: TodoList[] = [] ;


  
  constructor(public tds : TodolistService,
    public hs: HistoryService,
    public auth: AuthService,
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog) { 
    this.user = JSON.parse(localStorage.getItem('user')!);

    let currentTid = "";
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      currentTid = params['id'];
      if(params['id'] === undefined){
        //Prendre la premiere todo liste de l'utilisateur
        currentTid = this.user.todolists[0]
        this.router.navigate([currentTid]);


      }

      this.afs.collection<TodoList>("tasks").doc(currentTid).valueChanges().subscribe(data =>  hs.push(data as TodoList));

    

    })

    this.todoObs = combineLatest([tds.observable, this.fCurrent]).pipe(
      map( ([L, f]) => ({
        ...L,
        remaining: L.items.reduce( (nb, item) => item.isDone ? nb : nb++, 0),
        filter: f,
        displayedItems: L.items.filter(f),
        allIsDone: !L.items.find( it => !it.isDone ),
      }) )
    );
    
    
    this.tds.observable.subscribe(todolist=>{
      hs.push(todolist); 
      } 
    ).unsubscribe();

   

    this.hs.observable.subscribe(history =>{
        if( history.currentIndex !== -1){
          console.log(history.current.items.length)
          this.tds.updateTodoList(history.current)
        }
      }
    );


    const L =  this.user.todolists.map( tid =>  this.afs.collection("tasks").doc(tid).valueChanges() );
    this.obsAllLists = combineLatest( L );
    this.obsAllLists.subscribe(L =>{
      this.allUserTodolists = [];
       L.map(todos => {
        const todolist = todos as TodoList;
        this.allUserTodolists.push(todolist);
      })});
     


  }


  setFilter(f:FctFilter) {
    this.fCurrent.next(f);
  }

  onFilterChanged(value: number){
    switch(value){
      case 0:
        this.setFilter(this.fAll);
        break;
      case 1:
        this.setFilter(this.fActive);
        break;

      case 2:
        this.setFilter(this.fCompleted);
        break;
    }
  }

  getProgress(todolist: TodoList): number{
    
    let progress =  (todolist.items.reduce( (nb, item) => item.isDone ? nb++ : nb, 0)  * 100) / todolist.items.length;
    console.log("progress: "+ progress);

    return progress;
  }

  pushOnDb(todolist: TodoList){

    const todo : TodoList = {label: todolist.label, description: todolist.description, id: todolist.id, items: todolist.items, emoji: todolist.emoji}
    console.log("Push de la todoid: "+ todolist.id);
    this.afs.doc<TodoList>("tasks/"+todolist.id).set(todo, {merge: true});
  }


  openCreateTodoListDialog(){
    this.dialog.open(CreateComponent, {
      backdropClass: 'backdropBackground'})
  }
}
