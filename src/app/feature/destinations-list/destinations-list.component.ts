import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { RecommendationService } from 'src/app/core/services/recommendation.service';
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


  constructor(private http : HttpClient,private recommendService : RecommendationService, private authService : AuthService,private router : Router){}

  ngOnInit(): void {
    //fetch destination data from mock json file
    this.http.get<any[]>('assets/mock-destinations.json').subscribe(data => {
      this.destinations = data;
      this.filteredDestinations = data;
    })
    this.loggedInUser = this.authService.getLoggedInUser(); //get logged in user info
    if(this.loggedInUser){
      this.fetchRecommendations() //fecthes recommendations
    }
  }

  fetchRecommendations(){ //fetches recommendations based on user itinerary activities
    console.log('this.loggedInUser:-',this.loggedInUser);
    this.recommendService.getUserDestinations(this.loggedInUser).subscribe({
      next : (userDestination) => {
        this.recommendedDestinations = this.recommendService.recommendDestinations(userDestination,this.destinations);
      },
      error : (err) => {
        console.log('err:-',err);
        //this.recommendedDestinations = [];
      }
    }
    );
  }
  // fetchRecommendations(){ //fetches recommendations based on user itinerary activities
  //   this.recommendService.getUserDestinations(this.loggedInUser).subscribe(
  //     userDestination => {
  //       this.recommendedDestinations = this.recommendService.recommendDestinations(userDestination,this.destinations);
  //     }
  //   );
  // }

  filterDestinations() {  //filters destianations based on type and max budget
    this.filteredDestinations = this.destinations.filter(destination => {
      return (
        (!this.filterType || destination.type.toLowerCase().includes(this.filterType.toLowerCase())) &&
        (!this.maxBudget || destination.budget <= this.maxBudget)
      );
    });
  }

   stars(rating : number) { // to show star icons
    return Array(Math.floor(rating));
  }

  redirectTodetail(name : string){  //redirects to destination detail page
    this.router.navigate([`/destinations/${name}`]);
  }
}
