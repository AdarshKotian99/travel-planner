import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetTrackerComponent } from './budget-tracker/budget-tracker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const routes : Routes = [
  {path : '',component:BudgetTrackerComponent}
]

@NgModule({
  declarations: [
    BudgetTrackerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),

    NgChartsModule,

    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class BudgetTrackerModule { }
