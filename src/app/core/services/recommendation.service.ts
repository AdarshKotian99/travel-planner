import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Destination } from 'src/app/models/destination';
import { map, Observable } from 'rxjs';
import { user } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private http : HttpClient) { }

  getUserDestinations(userId: string): Observable<string[]> {
    return this.http.get<user>(`http://localhost:3000/signupUsersList/${userId}`).pipe(
      map(userData => userData.activities.map((activity: Activity) => activity.destination))
    );
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
