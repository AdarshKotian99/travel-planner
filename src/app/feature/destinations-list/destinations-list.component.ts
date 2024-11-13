import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Activity } from 'src/app/models/activity';
import { Destination } from 'src/app/models/destination';

@Component({
  selector: 'app-destinations-list',
  templateUrl: './destinations-list.component.html',
  styleUrls: ['./destinations-list.component.css']
})
export class DestinationsListComponent implements OnInit{

  destinations : Destination[] = [];
  filteredDestinations : Destination[] = [];
  filterType: string = '';
  maxBudget: number | null = null;
  loggedInUser: any;
  userDestinations: string[] = [];
  recommendedDestinations: Destination[] = [];


  constructor(private http : HttpClient,private authService : AuthService){}

  ngOnInit(): void {
    console.log('destination list ngOnInit');
    this.http.get<any[]>('assets/mock-destinations.json').subscribe(data => {
      console.log('data:-',data);
      this.destinations = data;
      this.filteredDestinations = data;
    })
    this.loggedInUser = this.authService.getLoggedInUser();
    this.loadUserActivities();
  }

  loadUserActivities() {
    if (this.loggedInUser) {
      this.http.get(`http://localhost:3000/signupUsersList/${this.loggedInUser.id}`)
        .subscribe((userData: any) => {
          this.userDestinations = userData.activities.map((activity: Activity) => activity.destination);
          this.fetchRecommendations();
        });
    }
  }

  fetchRecommendations() {
    this.http.get<Destination[]>('/assets/mock-destination.json').subscribe((destinations) => {
      const userTypes = this.getUserDestinationTypes(destinations);
      this.recommendedDestinations = destinations.filter(
        destination => !this.userDestinations.includes(destination.name) && 
                       userTypes.includes(destination.type)
      );
    });
  }

  getUserDestinationTypes(destinations: Destination[]): string[] {
    const userTypes = new Set<string>();
    this.userDestinations.forEach(destination => {
      const match = destinations.find(dest => dest.name === destination);
      if (match){
        userTypes.add(match.type);
      } 
    });
    return Array.from(userTypes);
  }

  // filterDestinations(event : Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const value = inputElement.value;
  //   this.filteredDestinations = this.destinations.filter(d => d.type.includes(value));
  // }

  filterDestinations() {
    this.filteredDestinations = this.destinations.filter(destination => {
      return (
        (!this.filterType || destination.type.toLowerCase().includes(this.filterType.toLowerCase())) &&
        (!this.maxBudget || destination.budget <= this.maxBudget)
      );
    });
  }

  addReview(destination: Destination, newReview: string) {
    if (newReview) {
      destination.reviews.push(newReview);
    }
  }

   stars(rating : number) {
    return Array(Math.floor(rating));
  }
}
