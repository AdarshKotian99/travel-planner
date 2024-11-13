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

const routes : Routes = [
  {path : '' ,redirectTo:'destinations',pathMatch:'full'},
  { path:'signup' , component:SignupComponent},
  { path:'login',component:LoginComponent},
  {path:'destinations',component:DestinationsListComponent},
  // {path:'destinations',component:DestinationsListComponent,canActivate:[authGuard]}
  {path:'budget', component : BudgetTrackerComponent},
  {path:'itinerary', component : ItineraryPlannerComponent},
]


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
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
    RouterModule.forChild(routes)
  ],
  exports: [
    // DestinationsListComponent
  ]
})
export class FeatureModule { }
