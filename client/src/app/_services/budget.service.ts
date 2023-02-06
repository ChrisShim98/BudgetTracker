import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MonthlyBudget } from '../_models/monthlyBudget';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  baseUrl = environment.apiUrl;
  currentUser: string = '';

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
}
