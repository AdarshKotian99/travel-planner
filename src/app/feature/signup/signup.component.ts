import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

import { user } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor(private auth : AuthService, private router : Router){}

  ngOnInit(): void {
    console.log('ng oninit called');
  }

  userEmail : string = '';
  pass : string = '';

  // userInfo !: user ; 
  handleSubmit(formData : any){
    // this.userInfo = formData;
    // this.userInfo.userEmail = formData.value.userEmail;
    // this.userInfo.pass = formData.value.password;
    this.auth.signUp(formData.value);
    this.router.navigate(['/destinations']);
  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }

}
