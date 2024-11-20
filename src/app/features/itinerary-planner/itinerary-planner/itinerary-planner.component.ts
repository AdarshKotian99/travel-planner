import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { FetchService } from 'src/app/core/services/fetch.service';
import { Activity } from 'src/app/models/activity';
import { user } from 'src/app/models/user';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-itinerary-planner',
  templateUrl: './itinerary-planner.component.html',
  styleUrls: ['./itinerary-planner.component.css'],
  standalone:false
})
export class ItineraryPlannerComponent implements OnInit , OnDestroy{
  
  loggedInUserId : string ='';  // Store the logged-in user's id
  itineraryForm: FormGroup;
  activities: Activity[] = [];
  shareableLink : string = '';
  linkCopied : boolean = false;
  isOffline : boolean = false;
  loadUserActiviesError : string = '';
  addActiviesError : string = '';
  private subscriptions: Subscription[] = [];
  userData !: user;
  
  constructor(
    private fb: FormBuilder, 
    private authService : AuthService, 
    private http : HttpClient,
    private clipboard : Clipboard,
    private fetchService : FetchService
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
    this.loggedInUserId = this.authService.getLoggedInUserId(); // Get logged-in user info
    this.checkOffline();
    if(this.isOffline){
      this.loadOfflineActivites();  //load activities from local storage
    }else{
      this.loadUserActivities();  //load users exting activities 
    }
    this.initializeSync();  //sets up event listeners
  }
  
  // Fetch the user's existing activities
  loadUserActivities(){
    const sub = this.authService.getUserData().subscribe({
      next : (userData : user) =>{
        this.userData = userData;
        this.activities = userData.activities;
        this.shareableLink = `http://localhost:4200/sharedItinerary/${this.loggedInUserId}`;  
      },
      error : (err) =>{
        this.loadUserActiviesError = 'Error occured while loading activities.';
      }
    });
    this.subscriptions.push(sub);
  }
  
  
  // loadUserActivities() {
  //     const sub = this.http.get(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`).subscribe({
  //       next : (userData : any) => {
  //         this.activities = userData.activities;
  //         this.shareableLink = `http://localhost:4200/sharedItinerary/${this.loggedInUserId}`;  
  //       },
  //       error : (err) => {
  //         console.log(err);
  //         this.loadUserActiviesError = true;
  //       }
  //     })
  //     this.subscriptions.push(sub);
  // }
  
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
        if(this.isOffline){ //if offline , store activities in local storage
          this.activities.push(activity);
          offlineActivities.push(activity);
          localStorage.setItem('activities',JSON.stringify(offlineActivities));
        }else{  //if online update actvities data in db
          this.activities.push(activity);
          const updatedUserData = {
            ...this.userData,
            activities: [...this.activities],
          };
          // Make a PUT request to update the user's destinations
          const sub = this.fetchService.updateUserData(this.loggedInUserId,updatedUserData).subscribe({
            next : () => {
              this.resetForm(); // Reset the form after successfully adding
            },
            error : (err) =>{
              const index = this.activities.indexOf(activity);
              this.activities.splice(index,1);  //remove from array if add activity fails
              console.log('error ocurred during Add Activity',err);
              this.addActiviesError = 'Error occured while adding activities. Try again.';
            }
          })
          
          // const sub = this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe({
          //   next : () => {
          //     this.resetForm(); // Reset the form after successfully adding
          //   },
          //   error : (err) =>{
          //     const index = this.activities.indexOf(activity);
          //     this.activities.splice(index,1);  //remove from array if add activity fails
          //     console.log('error ocurred during Add Activity',err);
          //     this.addActiviesError = 'Error occured while adding activities. Try again.';
          //   }
          // })
          // this.subscriptions.push(sub);
          
        this.subscriptions.push(sub);
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
  const tempActivities = this.activities;
  tempActivities.splice(index,1);
  const sub = this.authService.getUserData().subscribe({
    next : (userData) => {
      const updatedUserData = { ...userData, activities: [...tempActivities] };
      const sub = this.fetchService.updateUserData(this.loggedInUserId,updatedUserData).subscribe({
        next : () => {
          this.activities.splice(index, 1);
        }
      })
      this.subscriptions.push(sub);
    }
  })
  this.subscriptions.push(sub);
}
// deleteActivity(index: number) { //deletes activity
//   this.activities.splice(index, 1);
//   this.authService.getUserData().subscribe(
//     userData => {
//       const updatedUserData = { ...userData, activities: [...this.activities] };
//       const sub = this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe();
//       this.subscriptions.push(sub);
//     }
//   );

// }

copyLinkToClipboard(){  //to copy link to clipboard
  this.clipboard.copy(this.shareableLink);
  this.linkCopied = true;
}

checkOffline(){ //checks if user is online or offline
  this.isOffline = !navigator.onLine;
}

initializeSync(){ //sets up eventlistners
  window.addEventListener('online',this.handleOnline);
  window.addEventListener('offline',this.handleOffline);
}

private handleOnline = () => {
  this.isOffline = false;
  this.syncData(); // Sync data when going online
};

private handleOffline = () => {
  this.isOffline = true;
};

syncData(){ //sync activities from localstorage to db
  this.loadOfflineActivites();
  const sub = this.authService.getUserData().subscribe({
    next : (userData) => {
      const updatedActivities = []; 
      updatedActivities.push(...userData.activities);
      updatedActivities.push(...this.activities);
      const updatedUserData = {
        ...userData,
        activities: [...updatedActivities],
      };
      const sub = this.fetchService.updateUserData(this.loggedInUserId,updatedUserData).subscribe({
        next : () =>{
          this.resetForm(); // Reset the form after successfully adding    
          this.loadUserActivities();
        },
        error : (err) =>{
          console.log('error occured during syncData()',err);
        }
      })
      
    }
  }); 
  this.subscriptions.push(sub);
}
// syncData(){ //sync activities from localstorage to db
//   this.loadOfflineActivites();
//   const sub = this.authService.getUserData().subscribe(
//     userData => {      
//       const updatedActivities = []; 
//       updatedActivities.push(...userData.activities);
//       updatedActivities.push(...this.activities);
//       const updatedUserData = {
//         ...userData,
//         activities: [...updatedActivities],
//       };
//       // Make a PUT request to update the user's destinations
//       const sub = this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUserId}`, updatedUserData).subscribe({
//         next : () => {
//           this.resetForm(); // Reset the form after successfully adding    
//           this.loadUserActivities();
//         },
//         error : (err) => {
//           console.log('error occured during syncData()',err);
//         }

//       })
//       this.subscriptions.push(sub);
//     }
//   ); 
//   this.subscriptions.push(sub);
// }

resetForm(){
  this.itineraryForm.controls['destination'].reset();
  this.itineraryForm.controls['description'].reset();
  this.itineraryForm.controls['date'].reset();
}

ngOnDestroy(): void {
  this.subscriptions.forEach((sub) => sub.unsubscribe());
  window.removeEventListener('online', this.handleOnline);
  window.removeEventListener('offline', this.handleOffline);
}


}
