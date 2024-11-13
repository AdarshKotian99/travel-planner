import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();
  
  constructor(private http : HttpClient) { 
    this.loadUserFromLocalStorage();
  }
  
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
          this.saveUserToLocalStorage(user);
          this.currentUserSubject.next(user);
        }else{
          console.log('login failed');
        }
      })
    }
    
    // Get the currently logged-in user's data
    getLoggedInUser(): any {
      return this.currentUserSubject.value;
    }
    
    // Save the logged-in user's data to localStorage 
    private saveUserToLocalStorage(userData: any): void {
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
    }
    
    // Load the user data from localStorage
    private loadUserFromLocalStorage(): void {
      const userData = localStorage.getItem('loggedInUser');
      if (userData) {
        this.currentUserSubject.next(JSON.parse(userData));
      }
    }
    
    logout(){
      this.isAuthenticated = false;
      localStorage.removeItem('loggedInUser');
      this.currentUserSubject.next(null);
    }
    
    isLoggedIn():boolean{
      console.log('inside isLoggedIn')
      return this.isAuthenticated;
    }
    
  }
  