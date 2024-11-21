import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from 'src/app/models/user';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isAuthenticated : boolean = false;
  constructor(private http : HttpClient) { 
    this.loadUserFromLocalStorage();
  }
  
  signUp(userData : user){  //Posts new user data
    userData.activities = [];
    return this.http.post<user>('http://localhost:3000/signupUsersList',userData).pipe(
      map((res) => {
        console.log('res;-',res);
        this.isAuthenticated = true;
        this.saveUserToLocalStorage(res.id);
        this.currentUserSubject.next(res.id);
      }),
      catchError(() => {
        return throwError(() => new Error('An unknown error occurred. Please try again.'))
      }
    ))
}

login(userData : user) : Observable<boolean>{ 
  return this.http.get<user[]>('http://localhost:3000/signupUsersList').pipe(
    map((users)=>{
      const user = users.find((user)=>{
        return user.userEmail === userData.userEmail && user.pass === userData.pass;
      });
      if(user){
        this.isAuthenticated = true;
        this.saveUserToLocalStorage(user.id);
        this.currentUserSubject.next(user.id);
        return true;
      }else{
        return false;
      }
    }),
    catchError(() => {
      return throwError(() => new Error('An unknown error occurred. Please try again.'))
    }
  ))
}

// Get the currently logged-in user's id
getLoggedInUserId(): string {
  return this.currentUserSubject.value;
}

// Save the logged-in user's data to localStorage 
private saveUserToLocalStorage(userId: string): void {
  localStorage.setItem('loggedInUser', userId);
}

// Load the user data from localStorage
private loadUserFromLocalStorage(): void {
  const userData = localStorage.getItem('loggedInUser');
  if (userData) {
    this.currentUserSubject.next(userData);
    this.isAuthenticated = true;
  }
}

logout(){
  this.isAuthenticated = false;
  localStorage.removeItem('loggedInUser');
  this.currentUserSubject.next(null);
}

isLoggedIn():boolean{
  return this.isAuthenticated;
}

getUserData():Observable<user>{
  return this.http.get<user>(`http://localhost:3000/signupUsersList/${this.currentUserSubject.value}`)        
}

}
