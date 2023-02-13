import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Expense } from '../_models/expense';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MonthlyBudget } from '../_models/monthlyBudget';
import { BudgetService } from '../_services/budget.service';
import { Router } from '@angular/router';
import { Asset } from '../_models/asset';
import { take } from 'rxjs';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {
  model: MonthlyBudget = {
    id: 0,
    income: '',
    month: 1,
    year: 2023,
    jobField: '',
    frequency: 'monthly',
    expenseTotal: 0,
    expenses: [],
    assetTotal: 0,
    assets: [],
    budgetParentId: 0
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
    frequency: 'monthly',
    type: 'variable',
    amount: ''
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
    frequency: 'monthly',
    type: 'variable',
    amount: ''
  };
  TotalVarAssetModel: Asset[] = [];

  // Validation Error codes
  errorCode: number[] = [0, 0, 0, 0, 0];
  submitError: string = '';

  // Edit Budget
  isEditingBudget: boolean = false;

  constructor(private budgetService: BudgetService, private router: Router) { }

  ngOnInit(): void {
    this.budgetService.currentBudgetToEdit$.pipe(take(1)).subscribe({
      next: response => {
        if (response) {
          this.updateForm(response);
          this.isEditingBudget = true;
          this.budgetService.editMonthlyBudgetSource.next(null);
        }
      }
    })
  }
  // Editing Form functions
  updateForm(response: MonthlyBudget) {
    this.model = {
      id: response.id,
      income: response.income,
      month: response.month,
      year: response.year,
      jobField: response.jobField,
      frequency: response.frequency,
      expenseTotal: response.expenseTotal,
      expenses: [],
      assetTotal: response.assetTotal,
      assets: [],
      budgetParentId: response.budgetParentId
    };

    this.updateExpensesAssets(response);
  }

  //Editing Form functions
  updateExpensesAssets(response: MonthlyBudget) {
    console.log(response)
    for (let i = 0; i < response.expenses.length; i++) {
      if (response.expenses[i].frequency == response.frequency || response.expenses[i].frequency == '') {
        this.TotalExpenses = this.TotalExpenses + 1;
        this.TotalFixedExpenseModel.push(response.expenses[i]);
      } else {
        this.TotalExpenses = this.TotalExpenses + 1;
        this.TotalVarExpenseModel.push(response.expenses[i]);
      }
    }

    for (let i = 0; i < response.assets.length; i++) {
      if (response.assets[i].frequency == response.frequency || response.assets[i].frequency == '') {
        this.TotalAssets = this.TotalAssets + 1;
        this.TotalFixedAssetModel.push(response.assets[i]);
      } else {
        this.TotalAssets = this.TotalAssets + 1;
        this.TotalVarAssetModel.push(response.assets[i]);
      }
    }
  }


  AddFixedExpense() {
    if (this.FixedExpenseModel.name == '' || this.FixedExpenseModel.name == undefined) {
      this.errorCode[0] = 1;
      return
    }

    if (this.FixedExpenseModel.name.length > 15) {
      this.errorCode[0] = 2;
      return
    }

    for (let i = 0; i < this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel).length; i++) {
      if (this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel)[i].name == this.FixedExpenseModel.name) {
        this.errorCode[0] = 3;
        return
      }
    }

    this.TotalExpenses = this.TotalExpenses + 1;

    this.TotalFixedExpenseModel.push({
      id: this.TotalExpenses,
      name: this.FixedExpenseModel.name,
      frequency: "monthly",
      type: "fixed",
      amount: ''
    });

    this.FixedExpenseModel = {};
    this.errorCode[0] = 0;
  }

  RemoveFixedExpense(id: number) {
    for (let i = 0; i < this.TotalFixedExpenseModel.length; i++) {
      if (this.TotalFixedExpenseModel[i].id == id) {
        this.TotalFixedExpenseModel.splice(i, 1);
      }
    }
  }

  AddVarExpense() {
    if (this.VarExpenseModel.name == '' || this.VarExpenseModel.name == undefined) {
      this.errorCode[1] = 1;
      return
    }

    if (this.VarExpenseModel.name.length > 15) {
      this.errorCode[1] = 2;
      return
    }

    for (let i = 0; i < this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel).length; i++) {
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
      frequency: 'monthly',
      type: 'variable',
      amount: ''
    };

    this.errorCode[1] = 0;
  }

  RemoveVarExpense(id: number) {
    for (let i = 0; i < this.TotalVarExpenseModel.length; i++) {
      if (this.TotalVarExpenseModel[i].id == id) {
        this.TotalVarExpenseModel.splice(i, 1);
      }
    }
  }

  openAssetMenu(state: boolean) {
    this.assetMenuOpened = state;
  }

  AddFixedAsset() {
    if (this.FixedAssetModel.name == '' || this.FixedAssetModel.name == undefined) {
      this.errorCode[3] = 1;
      return
    }

    if (this.FixedAssetModel.name.length > 15) {
      this.errorCode[3] = 2;
      return
    }

    for (let i = 0; i < this.TotalFixedAssetModel.concat(this.TotalVarAssetModel).length; i++) {
      if (this.TotalFixedAssetModel.concat(this.TotalVarAssetModel)[i].name == this.FixedAssetModel.name) {
        this.errorCode[3] = 3;
        return
      }
    }

    this.TotalAssets = this.TotalAssets + 1;

    this.TotalFixedAssetModel.push({
      id: this.TotalAssets,
      name: this.FixedAssetModel.name,
      frequency: "monthly",
      type: "fixed",
      amount: ''
    });

    this.FixedAssetModel = {};
    this.errorCode[3] = 0;
  }

  RemoveFixedAsset(id: number) {
    for (let i = 0; i < this.TotalFixedAssetModel.length; i++) {
      if (this.TotalFixedAssetModel[i].id == id) {
        this.TotalFixedAssetModel.splice(i, 1);
      }
    }
  }

  AddVarAsset() {
    if (this.VarAssetModel.name == '' || this.VarAssetModel.name == undefined) {
      this.errorCode[4] = 1;
      return
    }

    if (this.VarAssetModel.name.length > 15) {
      this.errorCode[4] = 2;
      return
    }

    for (let i = 0; i < this.TotalFixedAssetModel.concat(this.TotalVarAssetModel).length; i++) {
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
      frequency: 'monthly',
      type: 'variable',
      amount: ''
    };

    this.errorCode[3] = 0;
  }

  RemoveVarAsset(id: number) {
    for (let i = 0; i < this.TotalVarAssetModel.length; i++) {
      if (this.TotalVarAssetModel[i].id == id) {
        this.TotalVarAssetModel.splice(i, 1);
      }
    }
  }

  calculations() {
    let assets = 0;
    let expenses = 0;

    for (let i = 0; i < this.TotalFixedAssetModel.length; i++) {
      if (parseInt(this.TotalFixedAssetModel[i].amount) > 999999.99) {
        this.errorCode[3] = 4;
        return
      }
      assets += parseInt(this.TotalFixedAssetModel[i].amount);
    }

    for (let i = 0; i < this.TotalFixedExpenseModel.length; i++) {
      if (parseInt(this.TotalFixedExpenseModel[i].amount) > 999999.99) {
        this.errorCode[0] = 4;
        return
      }
      expenses += parseInt(this.TotalFixedExpenseModel[i].amount);
    }

    this.errorCode = [0, 0, 0, 0, 0];
    this.model.assetTotal = parseFloat(assets.toFixed(2));
    this.model.expenseTotal = parseFloat(expenses.toFixed(2));
  }

  submit() {
    this.model.expenses = this.TotalFixedExpenseModel.concat(this.TotalVarExpenseModel);
    this.model.assets = this.TotalFixedAssetModel.concat(this.TotalVarAssetModel);
    for (let i = 0; i < this.model.expenses.length; i++) {
      this.model.expenses[i].id = 0;
    }
    for (let i = 0; i < this.model.assets.length; i++) {
      this.model.assets[i].id = 0;
    }

    if (this.model.year < 2000 || this.model.year > 3000) {
      this.errorCode[2] = 1;
      return
    }
    if (this.model.expenses.length == 0 && this.model.assets.length == 0) {
      this.errorCode[2] = 2;
      return
    }
    this.errorCode[2] = 0;

    for (let i = 0; i < this.errorCode.length; i++) {
      if (this.errorCode[i] != 0) {
        return;
      }
    }

    console.log(this.model)
    this.budgetService.monthlyBudgetToViewSource.next([this.model.month, this.model.year]);
    
    if (this.isEditingBudget) {
      this.updateBudget()
    } else {
      this.budgetService.addMonthlyBudget(this.model).subscribe({
        next: response => {
          if (response === true) {
            this.navigateToBudgetTable()
          }
        },
        error: error => this.submitError = error.error
      })
    }
  }

  updateBudget() {
    this.budgetService.updateBudget(this.model).subscribe({
      next: response => {
        if (response === true) {
          this.navigateToBudgetTable()
        }
      }
    })
  }

  navigateToBudgetTable() {
    this.router.navigateByUrl('/allbudgets')
  }
}
