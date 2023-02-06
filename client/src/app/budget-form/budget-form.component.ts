import { Component, OnInit } from '@angular/core';
import { Expense } from '../_models/expense';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MonthlyBudget } from '../_models/monthlyBudget';
import { BudgetService } from '../_services/budget.service';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {
  model: MonthlyBudget = {
    Income: 0,
    Month: 1,
    Year: 2023,
    JobField: '',
    Frequency: 'weekly',
    Expenses: [],
    Assets: []
  };
  expenses: Expense[] = [];
  faTrash = faTrash;
  TotalExpenses: number = 0;

  FixedExpenseModel: any = {};
  TotalFixedExpenseModel: Expense[] = [];

  VarExpenseModel: Expense = {
    id: 0,
    name: '',
    frequency: 'weekly',
    type: '',
    amount: 0
  };
  TotalVarExpenseModel: Expense[] = [];

  // Validation Error codes
  errorCode: number[] = [0, 0, 0];
  submitError: string = '';

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
  }

  AddFixedExpense() {
    if(this.FixedExpenseModel.name == '' || this.FixedExpenseModel.name == undefined) {
      this.errorCode[0] = 1;
      return
    }
    
    if(this.FixedExpenseModel.name.length > 17) {
      this.errorCode[0] = 2;
      return
    }

    if(this.TotalFixedExpenseModel.length >= 5) {
      this.errorCode[0] = 3;
      return
    }

    for(let i = 0; i < this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel).length; i++) {
      if (this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel)[i].name == this.FixedExpenseModel.name) {
        this.errorCode[0] = 4;
        return
      }
    }

    this.TotalExpenses = this.TotalExpenses + 1;

    this.FixedExpenseModel = this.TotalFixedExpenseModel.push({
      id: this.TotalExpenses,
      name: this.FixedExpenseModel.name,
      frequency: "",
      type: "fixed",
      amount: 0
    });

    this.FixedExpenseModel = {};
    this.errorCode[0] = 0;
  }

  RemoveFixedExpense(id: number) {
    for (let i = 0; i < this.TotalFixedExpenseModel.length; i++) {
      if (this.TotalFixedExpenseModel[i].id == id)
      {
        this.TotalFixedExpenseModel.splice(i, 1);
      }
    }
  }
  
  AddVarExpense() {
    if(this.VarExpenseModel.name == '' || this.VarExpenseModel.name == undefined) {
      this.errorCode[1] = 1;
      return
    }

    if(this.VarExpenseModel.name.length > 17) {
      this.errorCode[1] = 2;
      return
    }

    if(this.TotalVarExpenseModel.length >= 5) {
      this.errorCode[1] = 3;
      return
    }

    for(let i = 0; i < this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel).length; i++) {
      if (this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel)[i].name == this.VarExpenseModel.name) {
        this.errorCode[1] = 4;
        return
      }
    }

    this.TotalExpenses = this.TotalExpenses + 1;

    this.VarExpenseModel.id = this.TotalExpenses;

    this.TotalVarExpenseModel.push(this.VarExpenseModel);

    this.VarExpenseModel = {
      id: 0,
      name: '',
      frequency: 'weekly',
      type: 'variable',
      amount: 0
    };

    this.errorCode[1] = 0;
  }

  RemoveVarExpense(id: number) {
    for (let i = 0; i < this.TotalVarExpenseModel.length; i++) {
      if (this.TotalVarExpenseModel[i].id == id)
      {
        this.TotalVarExpenseModel.splice(i, 1);
      }
    }
  }

  submit() {
    this.model.Expenses = this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel);
    for(let i = 0; i < this.model.Expenses.length; i++)
    {
      this.model.Expenses[i].id = 0;
    }
    if(this.model.Year < 2000 || this.model.Year > 3000) {
      this.errorCode[2] = 1;
      return
    }
    this.errorCode[2] = 0;
    
    this.budgetService.addMonthlyBudget(this.model).subscribe({
      next: response => {
        if (response === true) {
          this.navigateToBudgetTable()
        }      
      },
      error: error => this.submitError = error.error
    })    
  }

  navigateToBudgetTable() {
    this.budgetService.getAllBudgets().subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }
}
