import { Component } from '@angular/core';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-budget-tracker',
  templateUrl: './budget-tracker.component.html',
  styleUrls: ['./budget-tracker.component.css']
})
export class BudgetTrackerComponent {

  budget : number = 0;
  expenses : Expense[] = [];
  totalSpent : number = 0;

  amount : number = 0;
  description : string = ''; 
  category : string = '';
  addExpense(){
    this.expenses.push({amount : this.amount,description : this.description,category : this.category})
    //this.totalSpent += this.amount;
    this.totalSpent = this.totalSpent + this.amount;
  }

  remainingBudget(){
    console.log('inside remainingBudget()');
    console.log('this.budget:-',this.budget+' this.totalSpent:-',this.totalSpent);
    console.log('res:-',this.budget - this.totalSpent)
    return this.budget - this.totalSpent;
  }
}
