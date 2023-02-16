import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from '../_services/budget.service';
import { faCaretLeft, faCaretRight, faCaretDown, faPen } from '@fortawesome/free-solid-svg-icons';
import { MonthlyBudget } from '../_models/monthlyBudget';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.css']
})
export class BudgetTableComponent implements OnInit {
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;
  faPencil = faPen;
  faCaretDown = faCaretDown;
  data: MonthlyBudget[] = [];
  months: string[] = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'];
  savings: number = 0;
  totalExpenses: number = 0;
  currentBudget: number = 0;
  loading: boolean = true;
  promptOpen: boolean = false;
  allBudgetPromptOpen: boolean = false;
  cardMoveDirection: number = 0;
  budgetFrequencyMenuOpen: boolean = false;
  @ViewChild('budgetFrequencyMenuButton') budgetFrequencyMenuButton: ElementRef | undefined;
  @ViewChild('budgetFrequencyMenu') budgetFrequencyMenu: ElementRef | undefined;
  @ViewChild('budgetFrequencyMenuButtonMobile') budgetFrequencyMenuButtonMobile: ElementRef | undefined;
  @ViewChild('budgetFrequencyMenuMobile') budgetFrequencyMenuMobile: ElementRef | undefined;
  chartdata = {labels: [ 'Expenses', 'Additional Income', 'Excess cash' ],
  datasets: [ {
    data: [ 0, 0 ],
    backgroundColor: ['#ff2f2f', '#ffc000', '#00B050'],
    hoverBackgroundColor: ['#C52224', '#BF9000', '#385723'],
    hoverBorderColor: ['white'],
  } ]};
  percentages = {
    passive: 0,
    expense: 0,
    excess: 0
  };
  displayData = {
    income: '',
    passive: '',
    expense: '',
    excess: ''
  }

  constructor(private budgetService: BudgetService, private router: Router, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.budgetFrequencyMenuButton !== undefined && e.target !== this.budgetFrequencyMenuButton.nativeElement &&
        this.budgetFrequencyMenu != undefined && e.target !== this.budgetFrequencyMenu.nativeElement &&
        this.budgetFrequencyMenuButtonMobile !== undefined && e.target !== this.budgetFrequencyMenuButtonMobile.nativeElement &&
        this.budgetFrequencyMenuMobile != undefined && e.target !== this.budgetFrequencyMenuMobile.nativeElement) {
        this.budgetFrequencyMenuOpen = false;
      }
    });
   }

  ngOnInit(): void {
    this.budgetService.getAllBudgets().subscribe({
      next: (response: MonthlyBudget[]) => { 
        this.data = response; 
        if (this.data.length > 0) {
          this.loadDefaultBudget();
          this.calculations();
        } 
        this.loading = false;
      }
    })
  }
  
  // Sets data to charts
  calculations() {
    const total = parseInt(this.data[this.currentBudget].income) + this.data[this.currentBudget].assetTotal;
    this.savings = total - this.data[this.currentBudget].expenseTotal;
    
    this.chartdata.datasets[0].data[0] = this.data[this.currentBudget].expenseTotal;
    this.chartdata.datasets[0].data[2] = this.savings <= 0 ? 0 : this.savings;

    this.percentages.excess = parseFloat(((this.savings / total) * 100).toFixed(0));
    this.percentages.passive = parseFloat(((this.data[this.currentBudget].assetTotal / total) * 100).toFixed(0));
    this.percentages.expense = parseFloat(((this.data[this.currentBudget].expenseTotal / total) * 100).toFixed(0));

    this.displayData.income = (total).toFixed(2);
    this.displayData.excess = this.savings.toFixed(2);
    this.displayData.passive = this.data[this.currentBudget].assetTotal.toFixed(2);
    this.displayData.expense = this.data[this.currentBudget].expenseTotal.toFixed(2);

    for (let i = 0; i < this.data[this.currentBudget].expenses.length; i++) {
      this.data[this.currentBudget].expenses[i].amount = parseFloat(this.data[this.currentBudget].expenses[i].amount).toFixed(2);
    }
    for (let i = 0; i < this.data[this.currentBudget].assets.length; i++) {
      this.data[this.currentBudget].assets[i].amount = parseFloat(this.data[this.currentBudget].assets[i].amount).toFixed(2);
    }
  }

  loadDefaultBudget() {
    this.budgetService.monthlyBudgetToView$.subscribe({
      next: response => {
        if(response?.length == 2) {
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].month == response[0] && this.data[i].year == response[1]) {
              this.currentBudget = i;
            }
          }
        }
      }
    })
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

  toggleAllBudgetPrompt() {
    this.allBudgetPromptOpen = !this.allBudgetPromptOpen;
  }

  toggleBudgetFrequencyMenu() {
    this.budgetFrequencyMenuOpen = !this.budgetFrequencyMenuOpen;
  }

  setCurrentBudget(id: number) {
    this.currentBudget = id;
    this.toggleAllBudgetPrompt();
    window.scrollTo(0, 0);
  }

  budgetFrequencyOption(period: string) {
    this.loading = true;
    this.calculateMonthlyBudget(this.data[this.currentBudget].id, period);
  }

  calculateMonthlyBudget(id: number, period: string) {
    this.budgetService.calculateMonthlyBudget(id, period).subscribe({
      next: (response: MonthlyBudget[]) => { 
        this.data = response; 
        if (this.data.length > 0) {
          this.calculations();
        } 
        this.loading = false;
      }
    })
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
