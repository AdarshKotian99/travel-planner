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
  //loggedUserData : any; 
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
    console.log('this.loggedInUserId:-',this.loggedInUserId);
    this.checkOffline();
    if(this.isOffline){
      this.loadOfflineActivites();
    }else{
      this.loadUserActivities();
    }
    this.initializeSync();
  }
  
  // Fetch the user's existing activities
  loadUserActivities() {
    if (this.loggedInUserId) {
      console.log('this.loggedInUserId:-',this.loggedInUserId);
      this.http.get(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`).subscribe((userData: any) => {
        // this.activities = userData.hasOwnProperty('activities') ? userData.activities : [];
        this.activities = userData.activities;
        // this.activities = userData.activities !== null ? userData.activities : [];
        this.shareableLink = `http://localhost:4200/sharedItinerary/${this.loggedInUserId}`;
      });
    }
  }
  
  loadOfflineActivites(){
    const offlineActivities = localStorage.getItem('activities');
    this.activities = offlineActivities ? JSON.parse(offlineActivities) : [];
  }
  
  
  addActivity() {
    console.log('addActivity() called');
    if (this.itineraryForm.valid) {
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
        if(this.isOffline){
          offlineActivities.push(activity);
          localStorage.setItem('activities',JSON.stringify(offlineActivities));
        }else{
          //const userId = this.loggedInUserId;
          
          this.authService.getUserData().subscribe(
            userData => {
              const updatedUserData = {
                ...userData,
                activities: [...this.activities],
              };
              console.log('this.loggedInUserId:-',this.loggedInUserId);
              // Make a PUT request to update the user's destinations
              this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe(() => {
                // Reset the form after successfully adding
                //this.itineraryForm.reset();
                this.resetForm();
              });
            }
          );
        }
        //this.itineraryForm.reset();
      } else {
        alert('Activity date must be within the travel dates.');
      }
    }
  }
  
  drop(event: CdkDragDrop<Activity[]>) {
    moveItemInArray(this.activities, event.previousIndex, event.currentIndex);
  }
  
  deleteActivity(index: number) {
    this.activities.splice(index, 1);
    this.authService.getUserData().subscribe(
      userData => {
        const updatedUserData = { ...userData, activities: [...this.activities] };
        this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe();
      }
    );
    
  }
  
  copyLinkToClipboard(){
    this.clipboard.copy(this.shareableLink);
    this.linkCopied = true;
  }
  
  checkOffline(){
    this.isOffline = !navigator.onLine;
  }
  
  initializeSync(){
    window.addEventListener('online',()=>{
      this.isOffline = false;
      this.syncData();
      
    });
    window.addEventListener('offline',()=>{
      this.isOffline = true;
    });
  }
  
  syncData(){
    console.log('syncData() called');
    //const userId = this.loggedInUser.id;
    this.loadOfflineActivites();
  
    
    this.authService.getUserData().subscribe(
      userData => {
        console.log('userData.activities:-',userData.activities);
        console.log('this.activities:-',this.activities);      
        const updatedActivities = []; 
        updatedActivities.push(...userData.activities);
        updatedActivities.push(...this.activities);
        const updatedUserData = {
          ...userData,
          activities: [...updatedActivities],
        };
        console.log('updatedUserData:-',updatedUserData);
        // Make a PUT request to update the user's destinations
        this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe(() => {
          // Reset the form after successfully adding
          //this.itineraryForm.reset();
          this.resetForm();    
          this.loadUserActivities();
        });
      }
    ); 
    
    
    
  }
  
  resetForm(){
    this.itineraryForm.controls['destination'].reset();
    this.itineraryForm.controls['description'].reset();
    this.itineraryForm.controls['date'].reset();
  }
  
  
}
