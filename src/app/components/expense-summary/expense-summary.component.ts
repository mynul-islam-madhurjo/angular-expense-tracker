import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Expense {
  amount: number;
  date: Date;
  category: string;
  description: string;
}

@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-summary.component.html',
  styleUrl: './expense-summary.component.css'
})
export class ExpenseSummaryComponent {
  // Receive expenses from parent component
  @Input() expenses: Expense[] = [];

  calculateTotal(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  calculateByCategory(): {category: string, total: number}[] {
    const categoryTotals = new Map<string, number>();

    this.expenses.forEach(expense => {
      const currentTotal = categoryTotals.get(expense.category) || 0;
      categoryTotals.set(expense.category, currentTotal + expense.amount);
    });

    return Array.from(categoryTotals.entries())
      .map(([category, total]) => ({
        category,
        total
      }));
  }
}
