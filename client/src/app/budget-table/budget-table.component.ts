import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from '../_services/budget.service';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.css']
})
export class BudgetTableComponent implements OnInit {
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;
  data: any = [];
  months: string[] = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'];
  savings: number = 0;
  totalExpenses: number = 0;
  currentBudget: number = 0;
  loading: boolean = true;
  cardMoveDirection: number = 0;

  constructor(private budgetService: BudgetService, private router: Router) { }

  ngOnInit(): void {
    this.budgetService.getAllBudgets().subscribe({
      next: (response) => { 
        this.data = response; 
        console.log(response); 
        if (this.data.length > 0) {
          this.calculations();
        } 
        this.loading = false;
      }
    })
  }
  
  // Possibly moving to backend
  calculations() {
    this.totalExpenses = 0;

    for(let i = 0; i < this.data[this.currentBudget].expenses.length; i++) {
      this.totalExpenses += this.data[this.currentBudget].expenses[i].amount;
    }

    this.savings = this.data[this.currentBudget].income - this.totalExpenses;
  }

  createBudget() {
    this.router.navigateByUrl('/budget')
  }

  switchBudgetDate(direction: number) {
    if (direction == 0) {
      this.cardMoveDirection = 1;
      setTimeout(() => {
        this.currentBudget -= 1;
        this.cardMoveDirection = 0;
        this.calculations();
      }, 750)
    } else if (direction == 1) {
      this.cardMoveDirection = 1;
      setTimeout(() => {
        this.currentBudget += 1;
        this.cardMoveDirection = 0;
        this.calculations();
      }, 750)
    }
  }
}
