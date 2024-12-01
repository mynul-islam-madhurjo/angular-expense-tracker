import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Expense {
  amount: number;
  date: Date;
  category: string;
  description: string;
}

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  // Create event emitter to send data to parent
  @Output() expenseAdded = new EventEmitter<Expense>();

  // Model for the form
  expense: Expense = {
    amount: 0,
    date: new Date(),
    category: '',
    description: ''
  };

  categories: string[] = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];

  onSubmit() {
    // Emit the expense to parent component
    this.expenseAdded.emit({...this.expense});

    // Reset form
    this.expense = {
      amount: 0,
      date: new Date(),
      category: '',
      description: ''
    };
  }
}
