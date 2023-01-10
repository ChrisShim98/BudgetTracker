import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model: any = {};
  isError: boolean = false;

  constructor(private router: Router, public accountService: AccountService) { }

  ngOnInit(): void {
    this.isError = false;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/users');
        this.model = {};
      },
      error: error => this.isError = true
    })
  }

}
