import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-filter.component.html',
  styleUrl: './expense-filter.component.css'
})
export class ExpenseFilterComponent {
  @Output() dateRangeChanged = new EventEmitter<{startDate: string, endDate: string}>();

  dateRange = {
    startDate: '',
    endDate: ''
  };

  onDateRangeChange() {
    if (this.dateRange.startDate && this.dateRange.endDate) {
      this.dateRangeChanged.emit(this.dateRange);
    }
  }

  clearFilter() {
    this.dateRange = {
      startDate: '',
      endDate: ''
    };
    this.dateRangeChanged.emit(this.dateRange);
  }
}
