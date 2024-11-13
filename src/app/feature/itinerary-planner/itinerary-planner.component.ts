import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-itinerary-planner',
  templateUrl: './itinerary-planner.component.html',
  styleUrls: ['./itinerary-planner.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ItineraryPlannerComponent {

  // todos = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep',
  //   'Walk Dog',
  // ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

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
    // moveItemInArray(this.activities.controls, event.previousIndex, event.currentIndex);
  }

  drop1(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.done, event.previousIndex, event.currentIndex);
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
