import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface Activity {
  destination: string;
  description: string;
  date: Date;
}

@Component({
  selector: 'app-itinerary-planner',
  templateUrl: './itinerary-planner.component.html',
  styleUrls: ['./itinerary-planner.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ItineraryPlannerComponent {

  itineraryForm: FormGroup;
  activities: Activity[] = [
    {destination:'london',description:'run',date:new Date},
    {destination:'mumbai',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
    {destination:'newyork',description:'run',date:new Date},
    {destination:'texas',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
    {destination:'london',description:'run',date:new Date},
  ];

  constructor(private fb: FormBuilder) {
    this.itineraryForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      destination: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
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
        this.itineraryForm.reset();
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
  }

}
