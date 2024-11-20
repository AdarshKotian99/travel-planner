import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-shared-itinerary',
  templateUrl: './shared-itinerary.component.html',
  styleUrls: ['./shared-itinerary.component.css'],
  standalone:false
})
export class SharedItineraryComponent implements OnInit{
  activities: Activity[]=[];
  displayedColumns: string[] = ['destination','description','date'];
  dataSource = new MatTableDataSource<Activity>();
  userId : any;
  fetchActivitiesError : string = '';

  constructor(
    private route : ActivatedRoute,
    private http : HttpClient
  ){}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadActivities(this.userId);
  }

  // Fetch the activities
  loadActivities(id : string){
    this.http.get<user>(`http://localhost:3000/signupUsersList/${id}`).subscribe({
      next : (userData)=>{
        this.activities = userData.activities;
        // this.activities = userData.hasOwnProperty('activities') ? userData.activities : [];
        this.dataSource.data = this.activities;
      },
      error : (err)=>{
        this.fetchActivitiesError = 'Error occured while loading itinerary. Try reloading the page';
      }
    }
    )
  }
}
