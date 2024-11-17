import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

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

  handleSubmit(formData : any){
    this.auth.signUp(formData.value);
    //this.router.navigate(['/login']);
  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }

}
