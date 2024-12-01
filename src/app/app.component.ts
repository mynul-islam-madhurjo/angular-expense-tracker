import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ExpenseSummaryComponent } from './components/expense-summary/expense-summary.component';
import { ExpenseFilterComponent } from './components/expense-filter/expense-filter.component';
import { Expense, NewExpense } from './models/expense.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent, ExpenseSummaryComponent, ExpenseFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Expense Tracker';
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  selectedExpense: Expense | null = null;
  dateRange: { startDate: string; endDate: string } = {
    startDate: '',
    endDate: ''
  };

  ngOnInit() {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      this.expenses = JSON.parse(savedExpenses).map((expense: any) => ({
        ...expense,
        date: new Date(expense.date)
      }));
      this.filteredExpenses = [...this.expenses];
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  onExpenseAdded(expense: NewExpense) {
    const newExpense: Expense = {
      ...expense,
      id: Date.now()
    };
    this.expenses = [...this.expenses, newExpense];
    this.saveToLocalStorage();
    this.filterExpenses();
  }

  onExpenseUpdated(updatedExpense: Expense) {
    this.expenses = this.expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    this.selectedExpense = null;
    this.saveToLocalStorage();
    this.filterExpenses();
  }

  editExpense(expense: Expense) {
    this.selectedExpense = { ...expense };
  }

  deleteExpense(id: number) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenses = this.expenses.filter(expense => expense.id !== id);
      this.saveToLocalStorage();
      this.filterExpenses();
    }
  }

  onDateRangeChanged(range: {startDate: string, endDate: string}) {
    this.dateRange = range;
    this.filterExpenses();
  }

  private filterExpenses() {
    if (!this.dateRange.startDate || !this.dateRange.endDate) {
      this.filteredExpenses = [...this.expenses];
      return;
    }

    const startDate = new Date(this.dateRange.startDate);
    const endDate = new Date(this.dateRange.endDate);
    endDate.setHours(23, 59, 59);

    this.filteredExpenses = this.expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  }
}
