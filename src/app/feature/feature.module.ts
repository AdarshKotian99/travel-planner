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

const routes : Routes = [
  {path : '' ,redirectTo:'destinations',pathMatch:'full'},
  { path:'signup' , component:SignupComponent},
  { path:'login',component:LoginComponent},
  {path:'destinations',component:DestinationsListComponent},
  // {path:'destinations',component:DestinationsListComponent,canActivate:[authGuard]}
  {path:'budget', component : BudgetTrackerComponent},
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
    RouterModule.forChild(routes)
  ],
  exports: [
    // DestinationsListComponent
  ]
})
export class FeatureModule { }
