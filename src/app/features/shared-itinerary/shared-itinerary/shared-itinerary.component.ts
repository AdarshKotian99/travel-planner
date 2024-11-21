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
  private activities: Activity[]=[];
  public displayedColumns: string[] = ['destination','description','date'];
  public dataSource = new MatTableDataSource<Activity>();
  private userId !: string;
  public fetchActivitiesError : string = '';

  constructor(
    private route : ActivatedRoute,
    private http : HttpClient
  ){}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.loadActivities(this.userId);
  }

  // Fetch the activities
  private loadActivities(id : string){
    this.http.get<user>(`http://localhost:3000/signupUsersList/${id}`).subscribe({
      next : (userData)=>{
        this.activities = userData.activities;
        this.dataSource.data = this.activities;
      },
      error : (err)=>{
        this.fetchActivitiesError = 'Error occured while loading itinerary. Try reloading the page';
      }
    }
    )
  }
}
