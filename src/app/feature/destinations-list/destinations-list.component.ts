import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Destinations } from 'src/app/models/destinations';

@Component({
  selector: 'app-destinations-list',
  templateUrl: './destinations-list.component.html',
  styleUrls: ['./destinations-list.component.css']
})
export class DestinationsListComponent implements OnInit{

  destinations : Destinations[] = [];
  filteredDestinations : Destinations[] = [];

  constructor(private http : HttpClient){}

  ngOnInit(): void {
    console.log('destination list ngOnInit');
    this.http.get<any[]>('assets/mock-destinations.json').subscribe(data => {
      console.log('data:-',data);
      this.destinations = data;
      this.filteredDestinations = data;
    })
  }

  filterDestinations(event : Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.filteredDestinations = this.destinations.filter(d => d.type.includes(value));
  }

}
