import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../_models/users';
import { UsersService } from '../_services/users.service';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from '../_models/pagination';
import { PaginationParams } from '../_models/paginationParams';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  users: Users[] = [];
  currentUserRoles: string[] = [];
  pagination: Pagination | undefined;
  paginationParams: PaginationParams | undefined;
  faTrash = faTrash;
  faPencil = faPencil;
  searchValue: string = "";

  constructor(private router: Router, private usersService: UsersService) { 
    this.paginationParams = this.usersService.getUserParams();
  }

  ngOnInit(): void {
    this.searchValue = "";
    this.paginationParams = new PaginationParams();
    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    if (this.paginationParams) {
      this.usersService.setUserParams(this.paginationParams)
      this.usersService.getUsers(this.paginationParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.users = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
  }

  pageChanged(event: any) {
    if (this.pagination && this.paginationParams) {
      if (this.pagination.currentPage !== event) {
        this.paginationParams.pageNumber = event;
        this.getUsers();
      }
    } 
  }

  search() {
    if (this.searchValue != '' && this.paginationParams) {
      this.paginationParams.searchQuery = this.searchValue.toLowerCase();
      this.paginationParams.pageNumber = 1;
      this.getUsers();
    }
    if (this.searchValue == '') {
      this.paginationParams = new PaginationParams();
      this.getUsers();
    }
  }

  delete(id: Number) {
    this.usersService.deleteUser(id);
  }

  getRoles() {
    let userData = localStorage.getItem('user');

    if (userData) { 
      this.currentUserRoles = JSON.parse(userData).roles;
    }
  }
}
