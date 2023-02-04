import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  isError: boolean = false;

  constructor(private router: Router, public accountService: AccountService) { }

  ngOnInit(): void {
    this.isError = false;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/budget');
        this.model = {};
      },
      error: error => this.isError = true
    })
  }

  createGuest() {
    this.accountService.createGuest().subscribe({
      next: _ => {
        this.router.navigateByUrl('/budget');
      },
      error: error => this.isError = true
    })
  }

}
