import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

describe('AccountService', () => {
  let accountService: AccountService,
        httpTestingController: HttpTestingController;  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AccountService                
      ]
    });

    accountService = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  it('should be able to login and store current user data', () => {
    // Arrange 
    // Inputted form data
    let model: any = {
      username: "chris",
      password: "Chris123"
    };

    // JWT Response
    let response : User = {
      username: "chris",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNocmlzIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WyJtZW1iZXIiXX0.tM8YxMpa61JEP37Fb6v7u5nXgg-GwatmC3qT3u008Fg",
      roles: ["member"]
    };

    // Act
    accountService.login(model).subscribe(() => {
      // Assert
      // current user source should have a user after the login function has been called
      expect(accountService.currentUserSource).toBeTruthy();
      expect(localStorage.getItem('user')).toBeTruthy();
    });

    const req = httpTestingController.expectOne(accountService.baseUrl + 'account/login');

    expect(req.request.method).toEqual("POST");

    req.flush(response);
  });

  it('should be able to logout and remove current user', () => {
    // Arrange
    let response : User = {
      username: "chris",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNocmlzIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WyJtZW1iZXIiXX0.tM8YxMpa61JEP37Fb6v7u5nXgg-GwatmC3qT3u008Fg",
      roles: ["member"]
    };

    localStorage.setItem('user', JSON.stringify(response));

    // Act
    accountService.logout();

    // Assert
    expect(localStorage.getItem('user')).toBeFalsy();
  });

  it('should be able to register and store current user', () => {
    // Arrange
    let registerForm = {
      username: "Chris",
      password: "Chris123",
      confirmPassword: "Chris123",
      email: "chris@chris.com"
    }

    let response : User = {
      username: "chris",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNocmlzIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WyJtZW1iZXIiXX0.tM8YxMpa61JEP37Fb6v7u5nXgg-GwatmC3qT3u008Fg",
      roles: ["member"]
    };

    // Act
    accountService.register(registerForm).subscribe(() => {
      // Assert
      // current user source should have a user after the login function has been called
      expect(accountService.currentUserSource).toBeTruthy();
      expect(localStorage.getItem('user')).toBeTruthy();
    })

    const req = httpTestingController.expectOne(accountService.baseUrl + 'account/register');

    expect(req.request.method).toEqual("POST");

    req.flush(response);
  })

  afterEach(() => {
    httpTestingController.verify();
  });

});
