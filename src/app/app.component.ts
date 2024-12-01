import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ExpenseSummaryComponent } from './components/expense-summary/expense-summary.component';

interface Expense {
  id: number;
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
        [expenseToEdit]="selectedExpense"
        (expenseAdded)="onExpenseAdded($event)"
        (expenseUpdated)="onExpenseUpdated($event)">
      </app-expense-form>

      <h2>Expense List</h2>
      <div class="expense-list">
        @for (expense of expenses; track expense.id) {
          <div class="expense-item">
            <div class="expense-details">
              <span>₹{{ expense.amount }}</span>
              <span>{{ expense.category }}</span>
              <span>{{ expense.date | date:'shortDate' }}</span>
            </div>
            <div class="expense-actions">
              <button (click)="editExpense(expense)">Edit</button>
              <button (click)="deleteExpense(expense.id)" class="delete">Delete</button>
            </div>
          </div>
        }
      </div>

      <app-expense-summary [expenses]="expenses"></app-expense-summary>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Expense Tracker';
  expenses: Expense[] = [];
  selectedExpense: Expense | null = null;

  // Load expenses from localStorage when component initializes
  ngOnInit() {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      this.expenses = JSON.parse(savedExpenses).map((expense: any) => ({
        ...expense,
        date: new Date(expense.date)
      }));
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  onExpenseAdded(expense: Omit<Expense, 'id'>) {
    const newExpense = {
      ...expense,
      id: Date.now()
    };
    this.expenses = [...this.expenses, newExpense];
    this.saveToLocalStorage();
  }

  onExpenseUpdated(updatedExpense: Expense) {
    this.expenses = this.expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    this.selectedExpense = null;
    this.saveToLocalStorage();
  }

  editExpense(expense: Expense) {
    this.selectedExpense = { ...expense };
  }

  deleteExpense(id: number) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenses = this.expenses.filter(expense => expense.id !== id);
      this.saveToLocalStorage();
    }
  }
}
