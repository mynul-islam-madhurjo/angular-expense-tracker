import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../models/expense.interface';

@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-summary.component.html',
  styleUrl: './expense-summary.component.css'
})
export class ExpenseSummaryComponent {
  @Input() expenses: Expense[] = [];

  calculateTotal(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  calculateByCategory(): {category: string, total: number}[] {
    const categoryMap = new Map<string, number>();

    this.expenses.forEach(expense => {
      const currentTotal = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, currentTotal + expense.amount);
    });

    return Array.from(categoryMap.entries())
      .map(([category, total]) => ({
        category,
        total
      }));
  }
}
