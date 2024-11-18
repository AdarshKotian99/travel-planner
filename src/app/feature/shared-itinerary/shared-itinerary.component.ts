import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-shared-itinerary',
  templateUrl: './shared-itinerary.component.html',
  styleUrls: ['./shared-itinerary.component.css']
})
export class SharedItineraryComponent implements OnInit{
  activities: Activity[]=[];
  displayedColumns: string[] = ['destination','description','date'];
  dataSource = new MatTableDataSource<Activity>();
  userId : any;

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
    this.http.get(`http://localhost:3000/signupUsersList/${id}`).subscribe({
      next : (userData:any)=>{
        this.activities = userData.hasOwnProperty('activities') ? userData.activities : [];
        this.dataSource.data = this.activities;
      }
    }
    )
  }
}
