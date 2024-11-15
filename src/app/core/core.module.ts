import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,  
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  exports : [
    NavbarComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class CoreModule { }
