import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-shared-itinerary',
  templateUrl: './shared-itinerary.component.html',
  styleUrls: ['./shared-itinerary.component.css']
})
export class SharedItineraryComponent implements OnInit{
  activities: Activity[]=[];
  displayedColumns: string[] = ['destination','description','date'];
  dataSource = new MatTableDataSource<Activity>();
  //loggedInUser : any;
  userId : any;

  constructor(
    private authService : AuthService,
    private route : ActivatedRoute,
    private http : HttpClient
  ){}

  ngOnInit(): void {
    // this.route.params.subscribe( params => {
    //   this.userId = params['id']; //Access id parameter from the url
    //   this.loadActivities(this.userId);
    // })

    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadActivities(this.userId);
  }

  // Fetch the activities
  loadActivities(id : string){
    this.http.get(`http://localhost:3000/signupUsersList/${id}`).subscribe(
      (userData : any)=>{
        this.activities = userData.hasOwnProperty('activities') ? userData.activities : [];
        console.log('this.activities:-',this.activities);
        this.dataSource.data = this.activities;
      }
    )
  }


}
