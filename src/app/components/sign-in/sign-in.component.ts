import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  hide = true;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public auth: AuthService,
    public dialogRef: MatDialogRef<SignInComponent>,
    ) {
      this.matIconRegistry.addSvgIcon(
        "logo",
        this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL)); 
    
  }

  ngOnInit(): void {
  }

}
