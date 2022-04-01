import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { TodolistComponent } from './components/todolist/todolist.component';
const routes: Routes = [
  
  {
    path:"create-todolist",
    component: CreateComponent
  },
  {
    path: "edit-profile",
    component: EditProfileComponent
  },
  {
    path:":id",
    component: TodolistComponent
  },
  {
    path:"",
    component: TodolistComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
