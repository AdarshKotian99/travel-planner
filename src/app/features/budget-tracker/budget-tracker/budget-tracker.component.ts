import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyFormatPipe } from 'src/app/shared/pipes/currency-format.pipe';


@Component({
  selector: 'app-budget-tracker',
  templateUrl: './budget-tracker.component.html',
  styleUrls: ['./budget-tracker.component.css'],
  providers : [CurrencyFormatPipe],
  standalone:false
})
export class BudgetTrackerComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;  // Chart reference

  expenseForm: FormGroup;
  totalBudget: number = 0;
  remainingBudget:number = 0;
  expenses = { Transport: 0, Accommodation: 0, Food: 0, Miscellaneous: 0 };

  // Chart variables
  chartData: ChartData<'pie'> = {
    labels: ['Transport', 'Accommodation', 'Food', 'Miscellaneous'],
    datasets: [
      {
        data: Object.values(this.expenses),
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1']
      }
    ]
  };
  chartType: 'pie' = 'pie';
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,  // Maintain aspect ratio of the chart
    plugins : {
      tooltip : {
        callbacks : {
          label : (tooltipItem) => {
            const value  = tooltipItem.raw as number;
            return `${tooltipItem.label}: ${this.currencyPipe.transform(value)}`;
          }
        }
      }
    }
  };

  constructor(private fb: FormBuilder, private currencyPipe : CurrencyFormatPipe) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }



  // Set the total budget when the input is changed
  setBudget() {
      this.remainingBudget = this.totalBudget - this.getTotalExpenses();
  }

  // Add a new expense
  addExpense() {
    if (this.expenseForm.valid) {
      const category: keyof typeof this.expenses = this.expenseForm.value.category;
      const amount = this.expenseForm.value.amount;

      // Prevent adding expenses if the budget is exceeded
      if (this.remainingBudget - amount < 0) {
        alert('You cannot add expenses above your remaining budget!');
        return;
      }

      // Add expense to the selected category and update remaining budget
      this.expenses[category] += amount;
      this.remainingBudget -= amount;

      // Reset the form and update chart
      this.expenseForm.reset();
      this.updateChartData();
    }
  }

  // Calculate the total expenses
  private getTotalExpenses(): number {
    return Object.values(this.expenses).reduce((total, amount) => total + amount, 0);
  }

  // Update chart data
  updateChartData() {
    this.chartData.datasets[0].data = Object.values(this.expenses);
    if (this.chart) {
      this.chart.update();
    }
  }
}
