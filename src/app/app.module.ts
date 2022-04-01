import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { CreateComponent } from './components/create/create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MatTabsModule} from '@angular/material/tabs';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    CreateComponent,
    TodoItemComponent,
    EditProfileComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgxEmojiPickerModule,
    MatProgressBarModule,
    MatTabsModule,
    FormsModule,
    NgScrollbarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
