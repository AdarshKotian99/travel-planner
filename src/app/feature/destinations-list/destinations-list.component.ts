import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RecommendationService } from 'src/app/core/services/recommendation.service';
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


  constructor(private http : HttpClient,private recommendService : RecommendationService, private authService : AuthService){}

  ngOnInit(): void {
    console.log('destination list ngOnInit');
    this.http.get<any[]>('assets/mock-destinations.json').subscribe(data => {
      console.log('data:-',data);
      this.destinations = data;
      this.filteredDestinations = data;
    })
    this.loggedInUser = this.authService.getLoggedInUser();
    if(this.loggedInUser){
      this.fetchRecommendations()
    }
  }

  fetchRecommendations(){
    this.recommendService.getUserDestinations(this.loggedInUser.id).subscribe(
      userDestination => {
        this.recommendedDestinations = this.recommendService.recommendDestinations(userDestination,this.destinations);
      }
    );
  }

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
