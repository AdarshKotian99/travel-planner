import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTrackerComponent } from './budget-tracker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CurrencyFormatPipe } from 'src/app/shared/pipes/currency-format.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BudgetTrackerComponent', () => {
  let component: BudgetTrackerComponent;
  let fixture: ComponentFixture<BudgetTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetTrackerComponent,CurrencyFormatPipe],
      imports:[
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        NgChartsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: []
    });
    fixture = TestBed.createComponent(BudgetTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set budget when the button is clicked', () => {
    //const budgetAmount = 1000;
    component.totalBudget = 1000;
    component.setBudget();
    //expect(component.totalBudget).toBe(budgetAmount);
    expect(component.remainingBudget).toBe(component.totalBudget);
  });

  it('should not allow adding expense if remaining budget is exceeded', () => {
    // component.budgetForm.setValue({ budgetAmount: initialBudget });
    component.totalBudget = 1000;
    component.setBudget();
    const expense = { category: 'Food', amount: 1200 };
    component.expenseForm.setValue(expense);
    spyOn(window, 'alert');
    component.addExpense();// Attempt to add an expense above the remaining budget
    expect(window.alert).toHaveBeenCalledWith('You cannot add expenses above your remaining budget!');
  });

  it('should add expense correctly and update the remaining budget', () => {
    // component.budgetForm.setValue({ budgetAmount: initialBudget });
    component.totalBudget = 1000;
    component.setBudget();
    const expense = { category: 'Food', amount: 200 };
    component.expenseForm.setValue(expense);
    component.addExpense();
    expect(component.expenses.Food).toBe(200);
    expect(component.remainingBudget).toBe(800);  // Budget should be decreased to 800
  });

  it('should update chart data when a new expense is added', () => {
    // component.budgetForm.setValue({ budgetAmount: initialBudget });
    component.totalBudget = 1000;
    component.setBudget();
    const expense = { category: 'Food', amount: 200 };
    component.expenseForm.setValue(expense);
    spyOn(component, 'updateChartData');
    component.addExpense();
    expect(component.updateChartData).toHaveBeenCalled();
  });
});
