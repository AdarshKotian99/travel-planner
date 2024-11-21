import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { FetchService } from 'src/app/core/services/fetch.service';
import { Destination } from 'src/app/models/destination';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css'],
  standalone:false
})
export class DestinationListComponent implements OnInit , OnDestroy{
  
  destinations : Destination[] = [];
  filteredDestinations : Destination[] = [];
  filterType: string = '';
  maxBudget: number | null = null;
  loggedInUser: any;
  userDestinations: string[] = [];
  recommendedDestinations: Destination[] = [];
  private subscriptions: Subscription[] = [];
  fetchDestinationError : string = '';
  fetchRecommendationError : string = '';
  
  constructor(private fetchService : FetchService, private authService : AuthService,private router : Router, private http :HttpClient){}

  ngOnInit(): void {
    //fetch destination data from mock json file
    const sub = this.fetchService.getAllDestinations().subscribe({
      next : (data) => {
        this.destinations = data;//store all fetched destintions
        this.filteredDestinations = data;//by default no filter is applied 
      },
      error : (err) => {
        this.fetchDestinationError = err.message;
      }
    })

    this.subscriptions.push(sub); //store subscription in a array to unsubscribe it on destroy
    this.loggedInUser = this.authService.getLoggedInUserId(); //get logged in user info
    if(this.loggedInUser){
      this.fetchRecommendations() //fetches recommendations

    }
    
  }
  
  fetchRecommendations(){ //fetches recommendations based on user itinerary activities
    const sub = this.fetchService.getUserDestinations(this.loggedInUser).subscribe({
      next : (userDestination) => {
        this.recommendedDestinations = this.fetchService.recommendDestinations(userDestination,this.destinations);  //store recommendations
      },
      error : (err) => {
        console.log('err:-',err);
        this.fetchRecommendationError = 'Error occured while fetching recommendations. Try reloading the page.'
      }
    }
  );
  this.subscriptions.push(sub);
}

filterDestinations() {  //filters destianations based on type and max budget
  this.filteredDestinations = this.destinations.filter(destination => {
    return (
      (!this.filterType || destination.type.toLowerCase().includes(this.filterType.toLowerCase())) &&
      (!this.maxBudget || destination.budget <= this.maxBudget) //if no filters are set then return true
    );
  });
}

stars(rating : number) { // to show star icons
  return Array(Math.floor(rating)); //return array of specific length based on rating
}

redirectTodetail(name : string){  //redirects to destination detail page
  this.router.navigate([`/destinations/${name}`]);
}

ngOnDestroy(): void {
  this.subscriptions.forEach((sub) => sub.unsubscribe); //unsubscribe 
}
}
