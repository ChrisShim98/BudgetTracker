import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  private usersListSource = new BehaviorSubject<Users[] | []>([]);
  users$ = this.usersListSource.asObservable();

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Users[]>(this.baseUrl + 'users');
  }
}
