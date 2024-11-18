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
  router : any;
  constructor(private http : HttpClient) { 
    this.loadUserFromLocalStorage();
  }
  
//   signUp(userData : user) : Observable<boolean>{
//     userData.activities = [];
//     userData.feedbacks = [];
//     return this.http.post<any>('http://localhost:3000/signupUsersList',userData).pipe(
    
//     ).subscribe({
//       next : (res) => {
//         this.isAuthenticated = true;
//         this.saveUserToLocalStorage(res.id);
//         this.currentUserSubject.next(res.id);
//       }
//     }
//   );
// }

  signUp(userData : user){
    userData.activities = [];
    userData.feedbacks = [];
    return this.http.post<any>('http://localhost:3000/signupUsersList',userData).pipe(
      // throwError(() => new Error('test'))
      catchError(err => throwError(() => new Error(err.message)))
    ).subscribe({
      next : (res) => {
        this.isAuthenticated = true;
        this.saveUserToLocalStorage(res.id);
        this.currentUserSubject.next(res.id);
      }
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
        this.isAuthenticated = true;
        this.saveUserToLocalStorage(user);
        this.currentUserSubject.next(user.id);
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
  localStorage.setItem('loggedInUser', userData.id);
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
