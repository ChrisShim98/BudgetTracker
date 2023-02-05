import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  formClicked: boolean = false;
  cardOpened: boolean = true;
  isError: boolean = false;
  errorMessage: string = '';
  
  constructor(public router: Router, public accountService: AccountService, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.intailizeForm();
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

  intailizeForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }
  
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === 
        control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  createGuest() {
    this.accountService.createGuest().subscribe({
      next: _ => {
        this.router.navigateByUrl('/budget');
      },
      error: error => this.isError = true
    })
  }

  register() {
    const values = {...this.registerForm.value};

    this.accountService.register(values).subscribe({
      next: _ => {
        this.router.navigateByUrl('/budget');
      },
      error: error => {
        this.errorMessage = error.error;
        this.isError = true;
      }
    })
  }
}
