import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationParams } from '../_models/paginationParams';
import { User } from '../_models/user';
import { Users } from '../_models/users';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  private usersListSource = new BehaviorSubject<Users[] | []>([]);
  users$ = this.usersListSource.asObservable();
  user: User | undefined;
  paginationParams: PaginationParams | undefined;

  constructor(private http: HttpClient, private accountService: AccountService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.paginationParams = new PaginationParams();
          this.user = user;
        }
      }
    })
   }

   getUserParams() {
    return this.paginationParams;
   }

   setUserParams(params: PaginationParams) {
    this.paginationParams = params;
   }

   resetUserParams() {
    if (this.user) {
      this.paginationParams = new PaginationParams();
      return this.paginationParams;
    }
    return
   }

  getUsers(paginationParams: PaginationParams) {
    let params = getPaginationHeaders(paginationParams.pageNumber, 
      paginationParams.pageSize, paginationParams.searchQuery);

    return getPaginatedResult<Users[]>(this.baseUrl + 'users', params, this.http).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteUser(id: Number) {
    return this.http.delete(this.baseUrl + 'users/delete?id=' + id).subscribe({
      next: response => {
        window.location.reload();
      },
      error: error => {
        
      }
    });
  }
}
