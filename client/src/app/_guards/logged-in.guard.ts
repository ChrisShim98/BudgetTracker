import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RegisterComponent } from '../register/register.component';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanDeactivate<RegisterComponent> {

  constructor(private accountService: AccountService) {}

  canDeactivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return false;
        else {
          return true;
        }
      })
    );
  }
  
}
