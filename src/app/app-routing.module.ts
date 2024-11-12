import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';
import { LoginComponent } from './feature/login/login.component';

const routes: Routes = [

  // {path:'signup',loadChildren: ()=> import('./feature/feature.module').then(mod => mod.FeatureModule)},
  { 
    path : '' , 
    loadChildren: ()=> import('./feature/feature.module').then(mod => mod.FeatureModule)
     
  },

  // { 
  //   path : '' , 
  //   component : LayoutComponent , 
  //   canActivate : [authGuard], 
  //   children : [
  //     {path : '', loadChildren: ()=> import('./feature/feature.module').then(mod => mod.FeatureModule)}
  //   ]
  // },
  {path : 'login' , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
