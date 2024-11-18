import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Activity } from 'src/app/models/activity';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-itinerary-planner',
  templateUrl: './itinerary-planner.component.html',
  styleUrls: ['./itinerary-planner.component.css'],
})
export class ItineraryPlannerComponent implements OnInit{
  
  loggedInUserId : string ='';  // Store the logged-in user's id
  itineraryForm: FormGroup;
  activities: Activity[] = [];
  shareableLink : string = '';
  linkCopied : boolean = false;
  isOffline : boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    private authService : AuthService, 
    private http : HttpClient,
    private clipboard : Clipboard
  ) 
  {
    this.itineraryForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      destination: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUser(); // Get logged-in user info
    this.checkOffline();
    if(this.isOffline){
      this.loadOfflineActivites();  //load activities from local storage
    }else{
      this.loadUserActivities();  //load users exting activities 
    }
    this.initializeSync();  //sets up event listeners
  }
  
  // Fetch the user's existing activities
  loadUserActivities() {
    if (this.loggedInUserId) {
      this.http.get(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`).subscribe({
        next : (userData : any) => {
          this.activities = userData.activities;
          this.shareableLink = `http://localhost:4200/sharedItinerary/${this.loggedInUserId}`;  
        }
      })
      // this.http.get(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`).subscribe((userData: any) => {
      //   this.activities = userData.activities;
      //   this.shareableLink = `http://localhost:4200/sharedItinerary/${this.loggedInUserId}`;
      // });
    }
  }
  
  //Loads user activities from loaclstorage
  loadOfflineActivites(){
    const offlineActivities = localStorage.getItem('activities');
    this.activities = offlineActivities ? JSON.parse(offlineActivities) : [];
  }
  
  //add activity to db aor localstorage
  addActivity() {
    if (this.itineraryForm.valid) { //check validation
      const activity: Activity = {
        destination: this.itineraryForm.value.destination,
        description: this.itineraryForm.value.description,
        date: this.itineraryForm.value.date
      };
      const offlineActivities : Activity[] =[];
      
      const startDate = this.itineraryForm.value.startDate;
      const endDate = this.itineraryForm.value.endDate;
      
      // Validate that activity date is within the travel dates
      if (activity.date >= startDate && activity.date <= endDate) {
        this.activities.push(activity);
        if(this.isOffline){ //if offline , store activities in local storage
          offlineActivities.push(activity);
          localStorage.setItem('activities',JSON.stringify(offlineActivities));
        }else{  //if online update actvities data in db
          this.authService.getUserData().subscribe(
            userData => {
              const updatedUserData = {
                ...userData,
                activities: [...this.activities],
              };
              // Make a PUT request to update the user's destinations
              this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe({
                next : () => {
                  this.resetForm(); // Reset the form after successfully adding
                },
                error : (err) =>{
                  console.log('error ocurred during Add Activity',err);
                }
              })
              // this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe(() => {
              //   this.resetForm(); // Reset the form after successfully adding
              // });
            }
          );
        }
      } else {
        alert('Activity date must be within the travel dates.');
      }
    }
  }
  
  drop(event: CdkDragDrop<Activity[]>) {
    moveItemInArray(this.activities, event.previousIndex, event.currentIndex);
  }
  
  deleteActivity(index: number) { //deletes activity
    this.activities.splice(index, 1);
    this.authService.getUserData().subscribe(
      userData => {
        const updatedUserData = { ...userData, activities: [...this.activities] };
        this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe();
      }
    );
    
  }
  
  copyLinkToClipboard(){  //to copy link to clipboard
    this.clipboard.copy(this.shareableLink);
    this.linkCopied = true;
  }
  
  checkOffline(){ //checks if user is online or offline
    this.isOffline = !navigator.onLine;
  }
  
  initializeSync(){ //sets up eventlistners
    window.addEventListener('online',()=>{
      this.isOffline = false;
      this.syncData();  //sync data is user goes online
      
    });
    window.addEventListener('offline',()=>{
      this.isOffline = true;
    });
  }
  
  syncData(){ //sync activities from localstorage to db
    this.loadOfflineActivites();
    this.authService.getUserData().subscribe(
      userData => {      
        const updatedActivities = []; 
        updatedActivities.push(...userData.activities);
        updatedActivities.push(...this.activities);
        const updatedUserData = {
          ...userData,
          activities: [...updatedActivities],
        };
        // Make a PUT request to update the user's destinations
        this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe({
          next : () => {
            this.resetForm(); // Reset the form after successfully adding    
            this.loadUserActivities();
          },
          error : (err) => {
            console.log('error occured during syncData()',err);
          }

        })
        // this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe(() => {
        //   this.resetForm(); // Reset the form after successfully adding    
        //   this.loadUserActivities();
        // });
      }
    ); 
  }
  
  resetForm(){
    this.itineraryForm.controls['destination'].reset();
    this.itineraryForm.controls['description'].reset();
    this.itineraryForm.controls['date'].reset();
  }
  
  
}
