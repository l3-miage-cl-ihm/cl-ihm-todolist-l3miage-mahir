import { ChangeDetectionStrategy, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { TodoItem, TodoList, TodolistService } from 'src/app/shared/services/todolist.service';
import { map } from 'rxjs/operators';
import { HistoryService } from 'src/app/shared/services/history.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { QrcodeComponent } from '../qrcode/qrcode.component';


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

  public displayDraw:boolean = false;
  readonly fAll: FctFilter = () => true;
  readonly fCompleted: FctFilter = (item) => item.isDone;
  readonly fActive: FctFilter = (item) => !item.isDone;
  private fCurrent = new BehaviorSubject<FctFilter>(this.fAll);
  readonly todoObs: Observable<TodoListPlus>;
  public user: User;
  public obsAllLists: Observable<unknown[]> | undefined;
  allUserTodolists: TodoList[] = [] ;
  public progress = 0 ;


  private currentTodolist: TodoList = {emoji: "", id:"", description: "", label: 'L3 MIAGE', items: [] };


  
  constructor(public tds : TodolistService,
    public hs: HistoryService,
    public auth: AuthService,
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog) { 
    this.user = JSON.parse(localStorage.getItem('user')!);

    let currentTid = "";

    // Selon la route, ou non trouver une todolist
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      currentTid = params['id'];
      if(params['id'] === undefined){
        //Prendre la premiere todo liste de l'utilisateur
        currentTid = this.user.todolists[0]
        this.router.navigate([currentTid]);
      }else{
        //Si jamais l'utilisateur est sur une todolist qu'il ne possede pas on l'enregistre dans ses todolists
        if(!this.user.todolists.find(id => id === currentTid)){
          this.user.todolists.push(currentTid);
          afs.collection("users").doc(this.user.uid).set(this.user, {merge: true});
        }
      }
      this.afs.collection<TodoList>("tasks").doc(currentTid).valueChanges().subscribe(data =>{  hs.push(data as TodoList)
      console.log("Changement observée dans la todolist du coté firebase")});
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
    
   

   
    this.onHistoryChangeListener();
   
    
    this.afs.doc("users/"+this.user.uid).valueChanges().subscribe(user => {
      const L =  this.user.todolists.map( tid =>  this.afs.collection("tasks").doc(tid).valueChanges() );
      this.obsAllLists = combineLatest( L );
      this.getAllUserTodoLists()
    });

    this.tds.observable.subscribe(todolist =>{
      if(todolist.id !== ''){
        if(JSON.stringify(this.currentTodolist) !== JSON.stringify(todolist)){
          this.currentTodolist = todolist;
          this.afs.doc("tasks/"+todolist.id).set(todolist, {merge:true});
          this.getProgress(todolist)
        }
      }
    }
  );
  }

  getAllUserTodoLists(){
    this.obsAllLists?.subscribe(L =>{
      this.allUserTodolists = [];
       L.map(todos => {
        const todolist = todos as TodoList;
        this.allUserTodolists.push(todolist);
      })});
  }

  /**
   * Changement de la todolist en fonction des undos / redos
   */
  onHistoryChangeListener(){
    this.hs.observable.subscribe(history =>{
        if( history.currentIndex !== -1){
          console.log(history.current.items.length)
          this.tds.updateTodoList(history.current)
        }
      }
    );
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

  getProgress(todoList: TodoList){
    console.log("nombre d'items:" + this.currentTodolist.items[0].isDone);
  
    const nbDone = todoList.items.filter(item => item.isDone).length;
    this.progress =  ( nbDone * 100) / todoList.items.length;
    
  }




  openCreateTodoListDialog(){
    this.dialog.open(CreateComponent, {
      backdropClass: 'backdropBackground'})
  }

  openQRCodeDialog(todolist: TodoList){
    const todoUrl = "todolistapp-39f3b.web.app/" +todolist.id;
    console.log("Url générée: "+ todoUrl);
    this.dialog.open(QrcodeComponent, {
      data: {link: todoUrl},
      backdropClass: 'backdropBackground',
    })
  }
}
