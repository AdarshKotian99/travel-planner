import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Destination } from 'src/app/models/destination';
import { catchError, map, Observable, throwError } from 'rxjs';
import { user } from 'src/app/models/user';
import { Feedback } from 'src/app/models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http : HttpClient) { }

  getAllDestinations():Observable<Destination[]>{ //fetches all destinations data
    return this.http.get<Destination[]>('assets/mock-destinations.json').pipe(
      catchError(() => {
        return throwError(() => new Error('Error occured while fetching destination. Try reloading the page.'))
      })
    )
  }

  getAllUsersData():Observable<user[]>{ //fetches all users data
    return this.http.get<user[]>('http://localhost:3000/signupUsersList').pipe(
      catchError(()=>{
        return throwError(() => new Error('Error occured while fetching all users data.'))
      })
    )
  }

  getUserDestinations(userId: string): Observable<string[]> { //fetches a user's activity destinations
    return this.http.get<user>(`http://localhost:3000/signupUsersList/${userId}`).pipe(
      map(userData => userData.activities.map((activity: Activity) => activity.destination))
    );
  }

  addFeedback(userFeedback : Feedback):Observable<Feedback>{  //Posts new feedback
    return this.http.post<Feedback>('http://localhost:3000/feedbacks',userFeedback).pipe(
      catchError(() => {
        return throwError(() => new Error('Error occured while submitting feedbacks. Try again.'))
      })
    )
  }

  getAllFeedbacks():Observable<Feedback[]>{ //Fetches all feedbacks
    return this.http.get<Feedback[]>('http://localhost:3000/feedbacks').pipe(
      catchError(()=>{
        return throwError(() => new Error('Error occured while fetching feedbacks.  Try reloading the page.'))
      })
    )
  }

  updateUserData(userId : string ,userData : user):Observable<user>{  //Updates user data
    return this.http.put<user>(`http://localhost:3000/signupUsersList/${userId}`,userData)
  }

  recommendDestinations(userDestinations: string[], destinations: Destination[]): Destination[] { 
    const userTypes = this.extractUserDestinationTypes(userDestinations, destinations);
    return destinations.filter(
      destination => !userDestinations.includes(destination.name) && userTypes.includes(destination.type)
    );
  }

  private extractUserDestinationTypes(userDestinations: string[], destinations: Destination[]): string[] {  //extracts user destination types
    const userTypes = new Set<string>();
    userDestinations.forEach(destinationName => {
      const match = destinations.find(dest => dest.name === destinationName);
      if (match) {
        userTypes.add(match.type);
      }
    });
    return Array.from(userTypes);
  }

}
