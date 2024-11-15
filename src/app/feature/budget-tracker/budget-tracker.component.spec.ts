import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetTrackerComponent } from './budget-tracker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyFormatPipe } from 'src/app/shared/pipes/currency-format.pipe';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BudgetTrackerComponent', () => {
  let component: BudgetTrackerComponent;
  let fixture: ComponentFixture<BudgetTrackerComponent>;
  let currencyPipe: CurrencyFormatPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetTrackerComponent, CurrencyFormatPipe ],
      imports: [
        ReactiveFormsModule, 
        NgChartsModule, 
        MatFormFieldModule,      
        MatInputModule,          
        MatSelectModule,         
        MatOptionModule,         
        MatButtonModule,
        NoopAnimationsModule          
      ],
      providers: [CurrencyFormatPipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    currencyPipe = TestBed.inject(CurrencyFormatPipe);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set budget when the form is submitted', () => {
    const budgetAmount = 1000;
    component.budgetForm.setValue({ budgetAmount });
    component.setBudget();
    expect(component.totalBudget).toBe(budgetAmount);
    expect(component.remainingBudget).toBe(budgetAmount);
  });

  it('should not allow adding expense if remaining budget is exceeded', () => {
    const initialBudget = 1000;
    component.budgetForm.setValue({ budgetAmount: initialBudget });
    component.setBudget();
    const expense = { category: 'Food', amount: 1200 };
    component.expenseForm.setValue(expense);
    spyOn(window, 'alert');
    component.addExpense();// Attempt to add an expense above the remaining budget
    expect(window.alert).toHaveBeenCalledWith('You cannot add expenses above your remaining budget!');
  });

  it('should add expense correctly and update the remaining budget', () => {
    const initialBudget = 1000;
    component.budgetForm.setValue({ budgetAmount: initialBudget });
    component.setBudget();
    const expense = { category: 'Food', amount: 200 };
    component.expenseForm.setValue(expense);
    component.addExpense();
    expect(component.expenses.Food).toBe(200);
    expect(component.remainingBudget).toBe(800);  // Budget should be decreased to 800
  });

  it('should update chart data when a new expense is added', () => {
    const initialBudget = 1000;
    component.budgetForm.setValue({ budgetAmount: initialBudget });
    component.setBudget();
    const expense = { category: 'Food', amount: 200 };
    component.expenseForm.setValue(expense);
    spyOn(component, 'updateChartData');
    component.addExpense();
    expect(component.updateChartData).toHaveBeenCalled();
  });
});
