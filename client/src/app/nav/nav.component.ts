import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { faCaretDown, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  faCaretDown = faCaretDown;
  faBars = faBars;
  faXmark = faXmark;
  menuOpened: boolean = false;
  mobileMenuOpened: boolean = false;

  constructor(public router: Router, public accountService: AccountService) { }

  ngOnInit(): void {
    
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  home() {
    this.router.navigateByUrl('/');
  }

  menuOpen() {
    this.menuOpened = !this.menuOpened;
  }

  mobileMenuOpen() {
    this.mobileMenuOpened = !this.mobileMenuOpened;
  }

}
