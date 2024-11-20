import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedItineraryComponent } from './shared-itinerary/shared-itinerary.component';
import { MatTableModule } from '@angular/material/table';

import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {path : '', component : SharedItineraryComponent}
]

@NgModule({
  declarations: [
    SharedItineraryComponent
  ],
  imports: [
    CommonModule,


    MatTableModule,
    RouterModule.forChild(routes),
  ]
})
export class SharedItineraryModule { }
