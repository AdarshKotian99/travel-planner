import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent {

  constructor(private auth : AuthService, private router : Router){}
  userEmail : string = '';
  pass : string = '';
  errorMessage: string = '';
  loginError : boolean = false;

  //userInfo !: user ; 
  handleLogin(formData : any){
    this.auth.login(formData.value).subscribe({
      next : (res) => {
        if(res){
          this.router.navigate(['/destinations']);
        }else{
          this.errorMessage = 'User Email or Password is invalid.'
        }
      },
      error : (err) => {
        this.errorMessage = err.message;
      }
    }
    )
  }

  redirectToSignUp(){
    this.router.navigate(['/signup']);
  }

}
