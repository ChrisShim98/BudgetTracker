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

  constructor(public router: Router, public accountService: AccountService, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.intailizeForm();
  }

  intailizeForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(8)]],
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

  register() {
    const values = {...this.registerForm.value};

    this.accountService.register(values).subscribe({
      next: _ => {
        this.router.navigateByUrl('/users');
      },
      error: error => this.validationErrors = error
    })
  }
}
