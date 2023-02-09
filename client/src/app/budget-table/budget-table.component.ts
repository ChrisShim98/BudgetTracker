import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from '../_services/budget.service';
import { faCaretLeft, faCaretRight, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.css']
})
export class BudgetTableComponent implements OnInit {
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;
  faPencil = faPen;
  data: any = [];
  months: string[] = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'];
  savings: number = 0;
  totalExpenses: number = 0;
  currentBudget: number = 0;
  loading: boolean = true;
  promptOpen: boolean = false;
  cardMoveDirection: number = 0;
  chartdata = {labels: [ 'Expenses', 'Assets', 'Spare cash' ],
  datasets: [ {
    data: [ 0, 0, 0 ],
    backgroundColor: ['#ff2f2f', '#ffc000', '#00B050'],
    hoverBackgroundColor: ['#C52224', '#BF9000', '#385723'],
    hoverBorderColor: ['white'],
  } ]};

  constructor(private budgetService: BudgetService, private router: Router) { }

  ngOnInit(): void {
    this.budgetService.getAllBudgets().subscribe({
      next: (response) => { 
        this.data = response; 
        if (this.data.length > 0) {
          this.calculations();
        } 
        this.loading = false;
      }
    })
  }
  
  // Possibly moving to backend - already did
  calculations() {
    this.savings = this.data[this.currentBudget].income - this.data[this.currentBudget].expenseTotal + this.data[this.currentBudget].assetTotal;
    
    this.chartdata.datasets[0].data[0] = this.data[this.currentBudget].expenseTotal;
    this.chartdata.datasets[0].data[1] = this.data[this.currentBudget].assetTotal;
    this.chartdata.datasets[0].data[2] = this.savings <= 0 ? 0 : this.savings;
  }

  createBudget() {
    this.router.navigateByUrl('/budget')
  }

  editBudget(id: number) {
    this.budgetService.getMonthlyBudget(id).subscribe({
      next: response => {
        this.createBudget();
      }
    });
  }

  deleteBudget(budgetId: number) {
    this.budgetService.deleteBudget(budgetId).subscribe({
      next: response => {if (response) window.location.reload()}
    })
  }

  togglePrompt() {
    this.promptOpen = !this.promptOpen;
  }

  switchBudgetDate(direction: number) {
    if (direction == 0) {
      this.cardMoveDirection = 1;
      setTimeout(() => {
        this.currentBudget -= 1;
        this.cardMoveDirection = 0;
        this.calculations();
      }, 750)
    } 
    else if (direction == 1) {
      this.cardMoveDirection = 1;
      setTimeout(() => {
        this.currentBudget += 1;
        this.cardMoveDirection = 0;
        this.calculations();
      }, 750)
    }
  }
}
