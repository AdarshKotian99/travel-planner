import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DestinationsListComponent } from './destinations-list/destinations-list.component';
import { ItineraryPlannerComponent } from './itinerary-planner/itinerary-planner.component';
import { BudgetTrackerComponent } from './budget-tracker/budget-tracker.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SharedItineraryComponent } from './shared-itinerary/shared-itinerary.component';
import { MatTableModule } from '@angular/material/table';
import { NotFoundComponent } from '../core/not-found/not-found.component';


const routes : Routes = [
  {path:'',component:DestinationsListComponent},
  {path:'budget', component : BudgetTrackerComponent},
  {path:'itinerary', component : ItineraryPlannerComponent},
  { path: '**', component: NotFoundComponent }
]


@NgModule({
  declarations: [
    DestinationsListComponent,
    ItineraryPlannerComponent,
    BudgetTrackerComponent,
    SharedItineraryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    NgChartsModule,
    ClipboardModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    // DestinationsListComponent
  ],
  providers:[
    MatDatepickerModule
  ],
})
export class FeatureModule { }
