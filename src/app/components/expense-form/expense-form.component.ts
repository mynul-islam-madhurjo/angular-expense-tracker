import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Expense {
  id?: number;
  amount: number;
  date: Date;
  category: string;
  description?: string;
}

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  expense: Expense = {
    amount: 0,
    date: new Date(),
    category: '',
    description: ''
  };

  categories: string[] = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];

  onSubmit() {
    console.log('Form submitted:', this.expense);
  }
}
