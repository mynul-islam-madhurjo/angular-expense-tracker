export interface Expense {
  id: number;
  amount: number;
  date: Date;
  category: string;
  description: string;
}

export interface NewExpense {
  amount: number;
  date: Date;
  category: string;
  description: string;
}
