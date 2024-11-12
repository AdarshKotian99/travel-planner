import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-itinerary-planner',
  templateUrl: './itinerary-planner.component.html',
  styleUrls: ['./itinerary-planner.component.css']
})
export class ItineraryPlannerComponent {
  itineraryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.itineraryForm = this.fb.group({
      travelStartDate: [null, Validators.required],
      travelEndDate: [null, Validators.required],
      activities: this.fb.array([])
    });
  }

  get activities(): FormArray {
    return this.itineraryForm.get('activities') as FormArray;
  }

  addActivity() {
    this.activities.push(
      this.fb.group({
        destination: ['', Validators.required],
        description: [''],
        date: [null, [Validators.required, this.validateDate.bind(this)]]
      })
    );
  }

  removeActivity(index: number) {
    this.activities.removeAt(index);
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    moveItemInArray(this.activities.controls, event.previousIndex, event.currentIndex);
  }

  validateDate(control : any) {
    const startDate = this.itineraryForm.get('travelStartDate')?.value;
    const endDate = this.itineraryForm.get('travelEndDate')?.value;
    const selectedDate = control.value;

    if (startDate && endDate && (selectedDate < startDate || selectedDate > endDate)) {
      return { dateOutOfRange: true };
    }
    return null;
  }

  submitItinerary() {
    if (this.itineraryForm.valid) {
      console.log('Itinerary:', this.itineraryForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
