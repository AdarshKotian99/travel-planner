import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from 'src/app/models/user';
import { AuthService } from './auth.service';
import { Activity } from 'src/app/models/activity';
import { Destination } from 'src/app/models/destination';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private http : HttpClient, private authService : AuthService) { }

  getUserDestinations(userId: string): Observable<string[]> {
    return this.http.get<any>(`http://localhost:3000/signupUsersList/${userId}`).pipe(
      map(userData => userData.activities.map((activity: Activity) => activity.destination))
    );
  }

  recommendDestinations(userDestinations: string[], destinations: Destination[]): Destination[] {
    const userTypes = this.extractUserDestinationTypes(userDestinations, destinations);
    return destinations.filter(
      destination => !userDestinations.includes(destination.name) && userTypes.includes(destination.type)
    );
  }

  private extractUserDestinationTypes(userDestinations: string[], destinations: Destination[]): string[] {
    const userTypes = new Set<string>();
    userDestinations.forEach(destinationName => {
      const match = destinations.find(dest => dest.name === destinationName);
      if (match) userTypes.add(match.type);
    });
    return Array.from(userTypes);
  }

}
