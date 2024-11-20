import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';
import { LoginComponent } from './core/components/login/login.component';
import { SignupComponent } from './core/components/signup/signup.component';
//import { SharedItineraryComponent } from './feature/shared-itinerary/shared-itinerary.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {path : '' ,redirectTo:'login',pathMatch:'full'},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  // {path : 'sharedItinerary/:id', component : SharedItineraryComponent},
  // {path:'destinations',loadChildren: ()=> import('./feature/feature.module').then(mod => mod.FeatureModule),canActivate : [authGuard]},
  

  {path : 'destinations',loadChildren:()=>import('./features/destination-list/destination-list.module').then(mod => mod.DestinationListModule),canActivate : [authGuard]},
  {path : 'budget',loadChildren:()=>import('./features/budget-tracker/budget-tracker.module').then(mod => mod.BudgetTrackerModule),canActivate:[authGuard]},
  {path : 'itinerary',loadChildren:()=>import('./features/itinerary-planner/itinerary-planner.module').then(mod => mod.ItineraryPlannerModule),canActivate:[authGuard]},
  {path : 'sharedItinerary/:id', loadChildren:()=>import('./features/shared-itinerary/shared-itinerary.module').then(mod => mod.SharedItineraryModule)},
  { path: '**', component: NotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
