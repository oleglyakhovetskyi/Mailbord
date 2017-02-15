import { Component, OnInit }            from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AlertService } from '../shared/auth/alert.service';
import { AuthService } from '../shared/auth/auth.service';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector:'account-settings',
  templateUrl: "account-settings.component.html",
})

export class AccountSettingsComponent implements OnInit {
  user: any = {
  };
  profileForm:FormGroup;

  loading: boolean = false;

  constructor(private fb:FormBuilder, private userService: UserService, private  router: Router, private authService: AuthService, private alertService: AlertService) {}

  ngOnInit() {
    // this.profile = this.authService.getProfileInfo()
    this.user = JSON.parse(localStorage.getItem('profileInfo'));
    console.log(this.user);
    this.buildForm();
  }

  buildForm():void {
    this.profileForm = this.fb.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24)
      ]
      ],
      'email': ['', [
        Validators.required
      ]
      ],
      'company': ['', [
        Validators.required
      ]
      ],
      'password': ['', [
        Validators.required,
        Validators.minLength(6)
       ]
      ]
    });
  }
  updateProfile() {
    // console.log(this.user);
    this.loading = true;
    this.userService.updateProfile(this.user).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        // this.authService.setProfileInfo(this.profile);
        localStorage.setItem('profileInfo', data._body);
        // console.log(data);
        this.alertService.popSuccess('Profile updated'); //show message
        this.router.navigate(['/profile:id']);
      },
      error => {
        this.loading = false;
         this.alertService.popError(error); //show message
      });
  }

}
