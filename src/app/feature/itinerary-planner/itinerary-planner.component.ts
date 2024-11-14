import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Activity } from 'src/app/models/activity';
import { user } from 'src/app/models/user';

// interface Activity {
//   destination: string;
//   description: string;
//   date: Date;
// }

@Component({
  selector: 'app-itinerary-planner',
  templateUrl: './itinerary-planner.component.html',
  styleUrls: ['./itinerary-planner.component.css'],
  // changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ItineraryPlannerComponent implements OnInit{
  
  loggedInUser: any;  // Store the logged-in user's details
  itineraryForm: FormGroup;
  activities: Activity[] = [
    // {destination:'london',description:'run',date:new Date},
    // {destination:'mumbai',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
    // {destination:'newyork',description:'run',date:new Date},
    // {destination:'texas',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
    // {destination:'london',description:'run',date:new Date},
  ];
  
  constructor(private fb: FormBuilder, private authService : AuthService, private http : HttpClient) {
    this.itineraryForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      destination: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser(); // Get logged-in user info
    console.log('this.loggedInUser.id',this.loggedInUser.id);
    this.loadUserActivities();
    console.log('this.activities:-',this.activities);
  }
  
  // Fetch the user's existing activities
  loadUserActivities() {
    if (this.loggedInUser) {
      this.http.get(`http://localhost:3000/signupUsersList/${this.loggedInUser.id}`).subscribe((userData: any) => {
        console.log('userData:-',userData);
        this.activities = userData.hasOwnProperty('activities') ? userData.activities : [];
        // this.activities = userData.activities !== null ? userData.activities : [];
        console.log('this.activities:-',this.activities);
      });
    }
  }
  
  
  addActivity() {
    if (this.itineraryForm.valid) {
      const activity: Activity = {
        destination: this.itineraryForm.value.destination,
        description: this.itineraryForm.value.description,
        date: this.itineraryForm.value.date
      };
      
      const startDate = this.itineraryForm.value.startDate;
      const endDate = this.itineraryForm.value.endDate;
      
      // Validate that activity date is within the travel dates
      if (activity.date >= startDate && activity.date <= endDate) {
        this.activities.push(activity);
        const userId = this.loggedInUser.id;
        const updatedUserData = {
          ...this.loggedInUser,
          activities: [...this.activities],
        };
        
        // Make a PUT request to update the user's destinations
        this.http.put(`http://localhost:3000/signupUsersList/${userId}`, updatedUserData).subscribe(() => {
          // Reset the form after successfully adding
          this.itineraryForm.reset();
        });
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
    const updatedUserData = { ...this.loggedInUser, destinations: [...this.activities] };
    this.http.put(`http://localhost:3000/signupUsersList/${this.loggedInUser.id}`, updatedUserData).subscribe();
  }


  // this.shareableLink = `${window.location.origin}/itinerary/${this.itineraryId}`;
  // this.linkCopied = false;
  // // Copy the shareable link to clipboard
  // copyLinkToClipboard() {
  //   if (this.shareableLink) {
  //     this.clipboard.copy(this.shareableLink);  // Copy the link to the clipboard
  //     this.linkCopied = true;  // Show feedback to the user
  //     console.log('Link copied:', this.shareableLink);
  //   }
  // }
  
}
