import { HttpClient } from '@angular/common/http';
import { Injectable,Injector  } from '@angular/core';
import { user } from 'src/app/models/user';
import { BehaviorSubject, map, mapTo, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  //public currentUser = this.currentUserSubject.asObservable();
  
  constructor(private http : HttpClient , private router : Router) { 
    this.loadUserFromLocalStorage();
  }

  // private get router(): Router {
  //   return this.injector.get(Router); // Lazy-load the Router
  // }
  
  private isAuthenticated : boolean = false;
  signUp(userData : user){
    console.log('userData:-',userData)
    userData.activities = [];
    userData.feedbacks = [];
    this.http.post<any>('http://localhost:3000/signupUsersList',userData).subscribe(
      res => {
        console.log(res);
        this.isAuthenticated = true;
        this.saveUserToLocalStorage(res.id);
        this.currentUserSubject.next(res.id);
        console.log('this.currentUserSubject.value:-',this.currentUserSubject.value);
        this.router.navigate(['/login']);
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
    localStorage.setItem('loggedInUser', JSON.stringify(userData.id));
  }
  
  // Load the user data from localStorage
  private loadUserFromLocalStorage(): void {
    const userData = localStorage.getItem('loggedInUser');
    console.log('userData:-',userData);
    if (userData !== null && userData !== '' && userData !== undefined) {
      console.log('hello');
      this.currentUserSubject.next(JSON.parse(userData));
      this.isAuthenticated = true;
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
  
  getUserData():Observable<user>{
    console.log('getUserData() called');
    console.log('this.currentUserSubject.value:-',this.currentUserSubject.value);
    return this.http.get<user>(`http://localhost:3000/signupUsersList/${this.currentUserSubject.value}`)        
  }
  
}
