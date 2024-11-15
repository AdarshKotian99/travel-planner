import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from 'src/app/models/user';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  //public currentUser = this.currentUserSubject.asObservable();
  
  constructor(private http : HttpClient) { 
    this.loadUserFromLocalStorage();
  }
  
  private isAuthenticated : boolean = false;
  signUp(userData : user){
    console.log('userData:-',userData)
    this.http.post<any>('http://localhost:3000/signupUsersList',userData).subscribe(
      res => {
        console.log(res);
        this.isAuthenticated = true;
          this.saveUserToLocalStorage(res);
          this.currentUserSubject.next(res);
          console.log('this.currentUserSubject.value:-',this.currentUserSubject.value);
      }
    );
  }
  
  login(userData : user) : Observable<boolean>{
    return this.http.get<any>('http://localhost:3000/signupUsersList').pipe(
      map((users)=>{
        const user = users.find((user : any)=>{
          return user.userEmail === userData.userEmail && user.pass === userData.pass;
        });
        if(user){
          console.log('login success');
          console.log('user:-',user)
          this.isAuthenticated = true;
          this.saveUserToLocalStorage(user);
          this.currentUserSubject.next(user);
          return true;
        }else{
          return false;
        }
      })
    )
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
  