import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { UpdateProfile } from '../_models/updateProfile';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  model: UpdateProfile = {
    Username: '',
    NewUsername: '',
    Password: '',
    NewPassword: ''
  };

  confirmNewPassword: string = '';
  isGuestAccount: boolean = false;
  errorCode: number[] = [0, 0, 0];
  updateSuccess: boolean = false;
  serverError: boolean = false;
  serverErrorMessage: string = ''; 

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.model = {
      Username: '',
      NewUsername: '',
      Password: '',
      NewPassword: ''
    };
    this.confirmNewPassword = '';
    
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.model.Username = user.username
          if(user.pin != null && user.pin != '') {
            this.isGuestAccount = true;
            this.model.Password = user.pin
          } else {
            this.isGuestAccount = false;
          }
        }
      }
    })
  }

  clientValidation() {
    this.serverError = false;
    this.serverErrorMessage = '';
    this.errorCode = [0, 0, 0];
    this.updateSuccess = false;

    if (this.model.Username == this.model.NewUsername.trim().toLowerCase()) {
      this.errorCode[0] = 1;
      return
    }
    if (this.model.NewPassword !== this.confirmNewPassword) {
      this.errorCode[1] = 1;
      return
    }
    if (this.model.Password == '') {
      this.errorCode[2] = 1;
      return
    }
    this.updateProfile();
  }

  updateProfile() {
    this.accountService.updateProfile(this.model).subscribe({
      next: (response) => {       
        this.updateSuccess = true;
        this.accountService.setCurrentUser(response);
        this.ngOnInit();
      },
      error: error => {
        this.serverError = true;
        this.serverErrorMessage = error.error;
        this.ngOnInit();
      }
    });
  }
}
