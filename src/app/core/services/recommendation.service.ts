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

  loggedInUser : any;
  userDestinations: string[] = [];
  recommendedDestinations: Destination[] = [];
  userTypes : string[] = [];

  fetchRecommendations() : Observable<Destination[]>{
    return this.http.get<Destination[]>('/assets/mock-destinations.json').
    pipe(
      map(data => {
        console.log('data:-',data);
        this.loadUserActivities(data);
        //const userTypes = this.getUserDestinationTypes(data);
        console.log('userTypes:-',this.userTypes);
        return data.filter(
          destination => this.userTypes.includes(destination.type)
        );
      })
    )
  }

  // fetchRecommendations1() : Observable<Destination[]> {
  //   console.log('inside fetchRecommendations:-')
  //   return this.http.get<Destination[]>('/assets/mock-destinations.json').subscribe((destinations) => {
  //     this.loadUserActivities();
  //     const userTypes = this.getUserDestinationTypes(destinations);
  //     console.log('userTypes:-',userTypes);
  //     return destinations.filter(
  //       // destination => !this.userDestinations.includes(destination.name) && userTypes.includes(destination.type)
  //       destination => userTypes.includes(destination.type)
  //     );
  //     //return this.recommendedDestinations;
  //   });
  //   console.log('this.recommendedDestinations:-',this.recommendedDestinations);
  //   //return this.recommendedDestinations;
  // }

  loadUserActivities(data : Destination[]) {
    this.loggedInUser = this.authService.getLoggedInUser();
    if (this.loggedInUser) {
      this.http.get(`http://localhost:3000/signupUsersList/${this.loggedInUser.id}`)
        .subscribe((userData: any) => {
          console.log('userData:-',userData);
          this.userDestinations = userData.activities.map((activity: Activity) => activity.destination);
          console.log('this.userDestinations:-',this.userDestinations);
          this.userTypes = this.getUserDestinationTypes(data);
          //this.fetchRecommendations();
        });
    }
  }

  getUserDestinationTypes(destinations: Destination[]): string[] {
    const userTypes = new Set<string>();
    console.log('this.userDestinations:-',this.userDestinations);
    this.userDestinations.forEach(destination => {
      const match = destinations.find(dest => dest.name === destination);
      if (match){
        userTypes.add(match.type);
      } 
    });
    return Array.from(userTypes);
  }


}
