import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth : AuthService, private router : Router){}
  userEmail : string = '';
  pass : string = '';
  loginSuccess : boolean | null = null;

  userInfo !: user ; 
  handleLogin(formData : any){
    this.auth.login(formData.value).subscribe(
      (res : boolean) => {
        this.loginSuccess = res;
        if(this.loginSuccess){
          this.router.navigate(['/destinations']);
        }    
      }
    )
  }

  redirectToSignUp(){
    this.router.navigate(['/signup']);
  }

}
