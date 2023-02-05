import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  faCaretDown = faCaretDown;
  menuOpened: boolean = false;

  constructor(private router: Router, public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('/login')
  }

  register() {
    this.router.navigateByUrl('/register')
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

  menuOpen() {
    this.menuOpened = !this.menuOpened;
  }

}
