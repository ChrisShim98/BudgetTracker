import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../_modules/shared.module';
import { AccountService } from '../_services/account.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let el: DebugElement;
  let accountService: any;

  beforeEach(async () => {
    let accountServiceSpy = jasmine.createSpyObj('AccountService', ['register']);
    await TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        {provide: AccountService, useValue: accountServiceSpy}                
    ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        accountService = TestBed.inject(AccountService);
      });   
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the register form", () => {    
    expect(fixture.nativeElement.querySelector('[data-test="registerForm"]'))
      .toBeTruthy("Data test on register form or register form is missing");
  });

  it("should have a username field", () => {    
    expect(fixture.nativeElement.querySelector('[data-test="username"]'))
      .toBeTruthy("Data test on username or username field is missing");
  });

  it("should have a email field", () => {    
    expect(fixture.nativeElement.querySelector('[data-test="email"]'))
      .toBeTruthy("Data test on email or email field is missing");
  });

  it("should have a password field", () => {    
    expect(fixture.nativeElement.querySelector('[data-test="password"]'))
      .toBeTruthy("Data test on password or password field is missing");
  });

  it("should have a confirm password field", () => {    
    expect(fixture.nativeElement.querySelector('[data-test="confirmPassword"]'))
      .toBeTruthy("Data test on confirm password or confirm password field is missing");
  });
});