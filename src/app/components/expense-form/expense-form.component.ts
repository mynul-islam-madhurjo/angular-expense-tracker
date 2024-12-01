import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense, NewExpense } from '../../models/expense.interface';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnChanges {
  @Input() expenseToEdit: Expense | null = null;
  @Output() expenseAdded = new EventEmitter<NewExpense>();
  @Output() expenseUpdated = new EventEmitter<Expense>();

  expense: NewExpense = {
    amount: 0,
    date: new Date(),
    category: '',
    description: ''
  };

  categories: string[] = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenseToEdit'] && this.expenseToEdit) {
      this.expense = { ...this.expenseToEdit };
    }
  }

  onSubmit() {
    if (this.expenseToEdit) {
      this.expenseUpdated.emit({
        ...this.expense,
        id: this.expenseToEdit.id
      } as Expense);
    } else {
      this.expenseAdded.emit(this.expense);
    }

    this.resetForm();
  }

  cancelEdit() {
    this.expenseToEdit = null;
    this.resetForm();
  }

  private resetForm() {
    this.expense = {
      amount: 0,
      date: new Date(),
      category: '',
      description: ''
    };
  }
}
