import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DestinationsListComponent } from './destinations-list/destinations-list.component';
import { authGuard } from '../core/gaurds/auth.guard';
import { ItineraryPlannerComponent } from './itinerary-planner/itinerary-planner.component';
import { BudgetTrackerComponent } from './budget-tracker/budget-tracker.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {NativeDateAdapter} from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { ClipboardModule } from '@angular/cdk/clipboard';


const routes : Routes = [
  {path:'',component:DestinationsListComponent},
  {path:'budget', component : BudgetTrackerComponent},
  {path:'itinerary', component : ItineraryPlannerComponent},
]


@NgModule({
  declarations: [
    // SignupComponent,
    // LoginComponent,
    DestinationsListComponent,
    ItineraryPlannerComponent,
    BudgetTrackerComponent,
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
