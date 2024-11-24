import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  private subscriptions: Subscription[] = [];
  private loggedInUser!: string;

  public filteredDestinations : Destination[] = [];
  public recommendedDestinations: Destination[] = []
  public fetchDestinationError : string = '';
  public fetchRecommendationError : string = '';
  public filterForm: FormGroup;
  public typesList : string[] = [];

  constructor(
    private fetchService : FetchService,
    private authService : AuthService,
    private router : Router,
    private fb: FormBuilder)
  {
    this.filterForm = this.fb.group({
      type: [null],
      budget: [null, [Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    //fetch destination data from mock json file
    const sub = this.fetchService.getAllDestinations().subscribe({
      next : (data) => {
        console.log('Destinations:', data);
        this.destinations = data;//store all fetched destintions
        this.filteredDestinations = data;//by default no filter is applied
        const list = new Set<string>;
        data.map(destination => {
          list.add(destination.type); //storing destination types
        })
        this.typesList = Array.from(list);
        console.log('this.typesList:-',this.typesList);
      },
      error : (err) => {
        console.log('Error fetching destinations:', err);
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
    const sub = this.fetchService.getUserDestinations(this.loggedInUser).subscribe({  //fetching user destinations
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

public filterDestinations() {  //filters destianations based on type and budget
  this.filteredDestinations = this.destinations.filter(destination => {
    return (
      (!this.filterForm.value.type || destination.type.toLowerCase().includes(this.filterForm.value.type.toLowerCase())) &&
      (!this.filterForm.value.budget || destination.budget <= this.filterForm.value.budget) //if no filters are set then return true
    );
  });
}

public stars(rating : number) { // to show star icons
  return Array(Math.floor(rating)); //return array of specific length based on rating
}

public redirectTodetail(name : string){  //redirects to destination detail page
  this.router.navigate([`/destinations/${name}`]);
}

public resetFilters(){ //reset filters
  this.filterForm.reset();
  this.filterDestinations();
}

ngOnDestroy(): void {
  this.subscriptions.forEach((sub) => sub.unsubscribe); //unsubscribe
}
}
