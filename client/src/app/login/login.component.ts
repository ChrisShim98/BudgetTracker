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
  formClicked: boolean = false;
  cardOpened: boolean = true;

  constructor(private router: Router, public accountService: AccountService) { }

  ngOnInit(): void {
    this.isError = false;
  }

  onFormClicked() {
    if (!this.formClicked) {
      this.formClicked = true;
    }   
  }

  onFormButtonClick(buttonClicked: string) {
    if (this.cardOpened && this.formClicked) {
      this.cardOpened = false;
    }  
    setTimeout(() => {
      this.formClicked = false;
      this.cardOpened = true;

      if (buttonClicked == 'cancel')
      {
        this.cancel();
      } else if (buttonClicked == 'login')
      {
        this.login();
      } else if (buttonClicked == 'register')
      {
        this.register();
      } else if (buttonClicked == 'guest')
      {
        this.createGuest();
      }
    }, 1100)  
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

  cancel() {
    this.router.navigateByUrl('/');
  }

  register() {
    this.router.navigateByUrl('/register');
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
