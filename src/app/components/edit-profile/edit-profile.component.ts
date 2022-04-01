import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(public dialog : MatDialog) { }

  ngOnInit(): void {
  }

  openSignIn(){
    this.dialog.open(SignInComponent, {
      backdropClass: 'backdropBackground' // This is the "wanted" line
    })
  }
}
