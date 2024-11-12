import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http : HttpClient) { }

  private isAuthenticated : boolean = false;
  signUp(userData : user){
    this.http.post<any>('http://localhost:3000/signupUsersList',userData).subscribe(
      res => {
        console.log(res);
        this.isAuthenticated = true;
      }
    );
  }
  
  login(userData : user){
    this.http.get<any>('http://localhost:3000/signupUsersList').subscribe(
      res => {
        const user = res.find((user : any)=>{
          return user.userEmail === userData.userEmail && user.pass === userData.pass;
        });
        if(user){
          console.log('login success');
          this.isAuthenticated = true;
        }else{
          console.log('login failed');
        }
      })
    }

    logout(){
      this.isAuthenticated = false;
    }

    isLoggedIn():boolean{
      console.log('inside isLoggedIn')
      return this.isAuthenticated;
    }
    
  }
  