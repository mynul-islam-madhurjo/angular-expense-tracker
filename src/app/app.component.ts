import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ExpenseSummaryComponent } from './components/expense-summary/expense-summary.component';

interface Expense {
  amount: number;
  date: Date;
  category: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent, ExpenseSummaryComponent],
  template: `
    <div class="container">
      <h1>{{ title }}</h1>

      <app-expense-form
        (expenseAdded)="onExpenseAdded($event)">
      </app-expense-form>

      <app-expense-summary
        [expenses]="expenses">
      </app-expense-summary>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Expense Tracker';
  expenses: Expense[] = [];

  onExpenseAdded(expense: Expense) {
    this.expenses = [...this.expenses, expense];
  }
}
