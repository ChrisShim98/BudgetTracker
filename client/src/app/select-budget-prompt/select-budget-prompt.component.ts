import { Component, Input, OnInit } from '@angular/core';
import { MonthlyBudget } from '../_models/monthlyBudget';

@Component({
  selector: 'app-select-budget-prompt',
  templateUrl: './select-budget-prompt.component.html',
  styleUrls: ['./select-budget-prompt.component.css']
})
export class SelectBudgetPromptComponent implements OnInit {
  @Input() selectFunction: (id: number) => void = () => {};
  @Input() monthlyBudgets: MonthlyBudget[] | undefined;
  @Input() closeFunction: () => void = () => {};

  constructor() { }

  ngOnInit(): void {
  }

}
