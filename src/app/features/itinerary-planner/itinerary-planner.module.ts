import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItineraryPlannerComponent } from './itinerary-planner/itinerary-planner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const routes : Routes=[
  {path:'',component:ItineraryPlannerComponent}
]


@NgModule({
  declarations: [
    ItineraryPlannerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    DragDropModule,

    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ItineraryPlannerModule { }
