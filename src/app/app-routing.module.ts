import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';
//import { LoginComponent } from './feature/login/login.component';
//import { SignupComponent } from './feature/signup/signup.component';
import { LoginComponent } from './core/components/login/login.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { SharedItineraryComponent } from './feature/shared-itinerary/shared-itinerary.component';

const routes: Routes = [

  // {path:'signup',loadChildren: ()=> import('./feature/feature.module').then(mod => mod.FeatureModule)},
  // { 
  //   path : '' , 
  //   loadChildren: ()=> import('./feature/feature.module').then(mod => mod.FeatureModule)
     
  // },

  // { 
  //   path : '' , 
  //   component : LayoutComponent , 
  //   canActivate : [authGuard], 
  //   children : [
  //     {path : '', loadChildren: ()=> import('./feature/feature.module').then(mod => mod.FeatureModule)}
  //   ]
  // },
  // {path : '' ,redirectTo:'login',pathMatch:'full'},
  // {path : 'login' , component: LoginComponent},
  // {path : 'signup', component : SignupComponent}
  {path : '' ,redirectTo:'login',pathMatch:'full'},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  {path : 'sharedItinerary/:id', component : SharedItineraryComponent},
  {path:'destinations',loadChildren: ()=> import('./feature/feature.module').then(mod => mod.FeatureModule),canActivate : [authGuard]},
  // {path:'budget',loadChildren: ()=> import('./feature/feature.module').then(mod => mod.FeatureModule),canActivate : [authGuard]},
  // {path:'itinerary',loadChildren: ()=> import('./feature/feature.module').then(mod => mod.FeatureModule),canActivate : [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
