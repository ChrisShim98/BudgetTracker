import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isError: boolean = false;

  constructor(private router: Router, public accountService: AccountService) { }

  ngOnInit(): void {
  }

  createGuest() {
    this.accountService.createGuest().subscribe({
      next: _ => {
        this.router.navigateByUrl('/budget');
      },
      error: error => this.isError = true
    })
  }

  createNewBudget() {
    this.router.navigateByUrl('/budget');
  }

}
