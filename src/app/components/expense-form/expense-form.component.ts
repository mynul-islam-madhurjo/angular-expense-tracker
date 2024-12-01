import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Expense {
  id?: number;
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
export class ExpenseFormComponent implements OnChanges {
  // Input to receive expense to edit from parent
  @Input() expenseToEdit: Expense | null = null;

  // Output events for adding and updating expenses
  @Output() expenseAdded = new EventEmitter<Expense>();
  @Output() expenseUpdated = new EventEmitter<Expense>();

  // Form model
  expense: Expense = {
    amount: 0,
    date: new Date(),
    category: '',
    description: ''
  };

  categories: string[] = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];

  // This lifecycle hook runs when @Input properties change
  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenseToEdit'] && this.expenseToEdit) {
      // Copy the expense to edit into the form
      this.expense = {
        ...this.expenseToEdit,
        // Ensure date is a Date object
        date: new Date(this.expenseToEdit.date)
      };
    }
  }

  onSubmit() {
    if (this.expenseToEdit) {
      // If we're editing, emit update event
      this.expenseUpdated.emit({
        ...this.expense,
        id: this.expenseToEdit.id
      });
    } else {
      // If we're adding new, emit add event
      this.expenseAdded.emit(this.expense);
    }

    // Reset form
    this.resetForm();
  }

  cancelEdit() {
    // Clear the edit mode and reset form
    this.expenseToEdit = null;
    this.resetForm();
  }

  private resetForm() {
    // Reset to initial state
    this.expense = {
      amount: 0,
      date: new Date(),
      category: '',
      description: ''
    };
  }
}
