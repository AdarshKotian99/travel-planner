import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth : AuthService){}
  userEmail : string = '';
  pass : string = '';

  userInfo !: user ; 
  handleLogin(formData : any){
    this.auth.login(formData.value);
  }

}
