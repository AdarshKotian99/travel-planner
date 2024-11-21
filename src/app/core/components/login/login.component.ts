import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

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

  handleLogin(formData : any){
    this.auth.login(formData.value).subscribe({
      next : (res) => {
        if(res){
          this.redirectToDestinations();
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

  redirectToDestinations(){
    this.router.navigate(['/destinations']);
  }

  redirectToSignUp(){
    this.router.navigate(['/signup']);
  }

}
