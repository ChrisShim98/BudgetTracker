import { Component, OnInit } from '@angular/core';
import { Expense } from '../_models/expense';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MonthlyBudget } from '../_models/monthlyBudget';
import { BudgetService } from '../_services/budget.service';
import { Router } from '@angular/router';
import { Asset } from '../_models/asset';

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
    ExpenseTotal: 0,
    Expenses: [],
    AssetTotal: 0,
    Assets: []
  };
  faTrash = faTrash;
  // Expenses
  expenses: Expense[] = [];
  TotalExpenses: number = 0;
  FixedExpenseModel: any = {};
  TotalFixedExpenseModel: Expense[] = [];
  VarExpenseModel: Expense = {
    id: 0,
    name: '',
    frequency: 'weekly',
    type: 'variable',
    amount: 0
  };
  TotalVarExpenseModel: Expense[] = [];

  assetMenuOpened: boolean = false;

  // Assets
  assets: Asset[] = [];
  TotalAssets: number = 0;
  FixedAssetModel: any = {};
  TotalFixedAssetModel: Expense[] = [];
  VarAssetModel: Asset = {
    id: 0,
    name: '',
    frequency: 'weekly',
    type: 'variable',
    amount: 0
  };
  TotalVarAssetModel: Asset[] = [];

  // Validation Error codes
  errorCode: number[] = [0, 0, 0, 0, 0];
  submitError: string = '';

  constructor(private budgetService: BudgetService, private router: Router) { }

  ngOnInit(): void {
  }

  AddFixedExpense() {
    if(this.FixedExpenseModel.name == '' || this.FixedExpenseModel.name == undefined) {
      this.errorCode[0] = 1;
      return
    }
    
    if(this.FixedExpenseModel.name.length > 15) {
      this.errorCode[0] = 2;
      return
    }

    for(let i = 0; i < this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel).length; i++) {
      if (this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel)[i].name == this.FixedExpenseModel.name) {
        this.errorCode[0] = 3;
        return
      }
    }

    this.TotalExpenses = this.TotalExpenses + 1;
    
    this.TotalFixedExpenseModel.push({
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

    if(this.VarExpenseModel.name.length > 15) {
      this.errorCode[1] = 2;
      return
    }

    for(let i = 0; i < this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel).length; i++) {
      if (this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel)[i].name == this.VarExpenseModel.name) {
        this.errorCode[1] = 3;
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

  openAssetMenu(state: boolean) {
    this.assetMenuOpened = state;
  }

  AddFixedAsset() {
    if(this.FixedAssetModel.name == '' || this.FixedAssetModel.name == undefined) {
      this.errorCode[3] = 1;
      return
    }
    
    if(this.FixedAssetModel.name.length > 15) {
      this.errorCode[3] = 2;
      return
    }

    for(let i = 0; i < this.TotalFixedAssetModel.concat(this.TotalVarAssetModel).length; i++) {
      if (this.TotalFixedAssetModel.concat(this.TotalVarAssetModel)[i].name == this.FixedAssetModel.name) {
        this.errorCode[3] = 3;
        return
      }
    }

    this.TotalAssets = this.TotalAssets + 1;
    
    this.TotalFixedAssetModel.push({
      id: this.TotalAssets,
      name: this.FixedAssetModel.name,
      frequency: "",
      type: "fixed",
      amount: 0
    });

    this.FixedAssetModel = {};
    this.errorCode[3] = 0;
  }

  RemoveFixedAsset(id: number) {
    for (let i = 0; i < this.TotalFixedAssetModel.length; i++) {
      if (this.TotalFixedAssetModel[i].id == id)
      {
        this.TotalFixedAssetModel.splice(i, 1);
      }
    }
  }
  
  AddVarAsset() {
    if(this.VarAssetModel.name == '' || this.VarAssetModel.name == undefined) {
      this.errorCode[4] = 1;
      return
    }

    if(this.VarAssetModel.name.length > 15) {
      this.errorCode[4] = 2;
      return
    }

    for(let i = 0; i < this.TotalFixedAssetModel.concat(this.TotalVarAssetModel).length; i++) {
      if (this.TotalFixedAssetModel.concat(this.TotalVarAssetModel)[i].name == this.VarAssetModel.name) {
        this.errorCode[4] = 3;
        return
      }
    }

    this.TotalAssets = this.TotalAssets + 1;

    this.VarAssetModel.id = this.TotalAssets;

    this.TotalVarAssetModel.push(this.VarAssetModel);

    this.VarAssetModel = {
      id: 0,
      name: '',
      frequency: 'weekly',
      type: 'variable',
      amount: 0
    };

    this.errorCode[3] = 0;
  }

  RemoveVarAsset(id: number) {
    for (let i = 0; i < this.TotalVarAssetModel.length; i++) {
      if (this.TotalVarAssetModel[i].id == id)
      {
        this.TotalVarAssetModel.splice(i, 1);
      }
    }
  }

  calculations() {
    let assets = 0;
    let expenses = 0;

    for (let i = 0; i < this.TotalFixedAssetModel.length; i++) {
      if (this.TotalFixedAssetModel[i].amount > 999999.99) {
        this.errorCode[3] = 4;
        return
      }
      assets += this.TotalFixedAssetModel[i].amount;
    }
    for (let i = 0; i < this.TotalVarAssetModel.length; i++) {
      if (this.TotalVarAssetModel[i].amount > 999999.99) {
        this.errorCode[4] = 4;
        return
      }
      assets += this.TotalVarAssetModel[i].amount;
    }

    for (let i = 0; i < this.TotalFixedExpenseModel.length; i++) {
      if (this.TotalFixedExpenseModel[i].amount > 999999.99) {
        this.errorCode[0] = 4;
        return
      }
      expenses += this.TotalFixedExpenseModel[i].amount;
    }
    for (let i = 0; i < this.TotalVarExpenseModel.length; i++) {
      if (this.TotalVarExpenseModel[i].amount > 999999.99) {
        this.errorCode[1] = 4;
        return
      }
      expenses += this.TotalVarExpenseModel[i].amount;
    }

    this.errorCode = [0, 0, 0, 0, 0];
    this.model.AssetTotal = parseFloat(assets.toFixed(2));
    this.model.ExpenseTotal = parseFloat(expenses.toFixed(2));
  }

  submit() {
    this.model.Expenses = this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel);
    this.model.Assets = this.TotalFixedAssetModel.concat(this.TotalVarAssetModel);
    for(let i = 0; i < this.model.Expenses.length; i++)
    {
      this.model.Expenses[i].id = 0;
    }
    for(let i = 0; i < this.model.Assets.length; i++)
    {
      this.model.Assets[i].id = 0;
    }

    if(this.model.Year < 2000 || this.model.Year > 3000) {
      this.errorCode[2] = 1;
      return
    }
    if(this.model.Expenses.length == 0 && this.model.Assets.length == 0) {
      this.errorCode[2] = 2;
      return
    }
    this.errorCode[2] = 0;

    for (let i = 0; i < this.errorCode.length; i++) {
      if (this.errorCode[i] != 0) {
        return;
      }
    }
    
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
    this.router.navigateByUrl('/allbudgets')
  }
}
