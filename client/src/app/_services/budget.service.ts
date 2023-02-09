import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MonthlyBudget } from '../_models/monthlyBudget';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  baseUrl = environment.apiUrl;
  currentUser: string = '';
  public editMonthlyBudgetSource = new BehaviorSubject<MonthlyBudget | null>(null);
  currentBudgetToEdit$ = this.editMonthlyBudgetSource.asObservable();

  constructor(private http: HttpClient, public accountService: AccountService) { }

  addMonthlyBudget(model: MonthlyBudget) {
    let userData = localStorage.getItem('user');

    if (userData) { 
      this.currentUser = JSON.parse(userData).username;
    }

    return this.http.post(this.baseUrl + 'budget?username=' + this.currentUser, model).pipe(
      response => {
        return response;
      }
    )
  }

  getAllBudgets() {
    let userData = localStorage.getItem('user');

    if (userData) { 
      this.currentUser = JSON.parse(userData).username;
    }

    return this.http.get(this.baseUrl + 'budget?username=' + this.currentUser).pipe(
      response => {
        return response;
      }
    )
  }

  getMonthlyBudget(id: number) {
    return this.http.get<MonthlyBudget>(this.baseUrl + 'budget/monthlybudget?Id=' + id).pipe(
      map((response: MonthlyBudget) => {
        const monthlyBudget = response;
        if (monthlyBudget) {
          this.editMonthlyBudgetSource.next(monthlyBudget);
        }
      }) 
    )
  }

  deleteBudget(budgetId: number) {
    return this.http.delete(this.baseUrl + 'budget?id=' + budgetId + '&username=' + this.currentUser).pipe(
      response => {
        return response;
      }
    )
  }
}
