import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private http : HttpClient){}

  ngOnInit(): void {
    console.log('destination list ngOnInit');
    this.http.get<any[]>('assets/mock-destinations.json').subscribe(data => {
      console.log('data:-',data);
      this.destinations = data;
      this.filteredDestinations = data;
    })
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
