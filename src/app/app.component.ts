import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';
  constructor(public auth: AuthService, private dialog: MatDialog){
    if(!auth.isLoggedIn){
      dialog.open(SignInComponent, {
        backdropClass: 'backdropBackground',
        disableClose: true
      });
    }
  }
}
