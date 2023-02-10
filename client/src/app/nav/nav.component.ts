import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { faCaretDown, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

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
  @ViewChild('menuButton') menuButton: ElementRef | undefined;
  @ViewChild('menu') menu: ElementRef | undefined;

  constructor(public router: Router, public accountService: AccountService, private renderer: Renderer2) { 
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.menuButton !== undefined && e.target !== this.menuButton.nativeElement &&
        this.menu != undefined && e.target !== this.menu.nativeElement) {
        this.menuOpened = false;
      }
    });
  }

  ngOnInit(): void {
    
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  logout() {
    this.menuOpened = false;
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  home() {
    this.mobileMenuOpened = false;
    this.router.navigateByUrl('/');
  }

  newBudget() {
    this.menuOpened = false;
    if (this.router.url == '/budget') {
      window.location.reload()
    } else {
      this.router.navigateByUrl('/budget');
    } 
  }

  allBudgets() {
    this.menuOpened = false;
    this.router.navigateByUrl('/allbudgets');
  }

  settings() {
    this.menuOpened = false;
    this.router.navigateByUrl('/settings');
  }

  menuOpen() {
    this.menuOpened = !this.menuOpened;
  }

  mobileMenuOpen() {
    this.mobileMenuOpened = !this.mobileMenuOpened;
  }

}
