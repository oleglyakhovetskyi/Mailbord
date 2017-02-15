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
  profile: any = {
  };
  loading = false;


  constructor(private fb:FormBuilder, private userService: UserService, private  router: Router, private authService: AuthService, private alertService: AlertService) {}

  ngOnInit() {
    // this.profile = this.authService.getProfileInfo()
    this.profile = JSON.parse(localStorage.getItem('profileInfo'));
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
      'nickname': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
      ]
    });
  }
  updateProfile() {
    this.loading = true;
    this.userService.updateProfile(this.profile).subscribe(
      data => {
        // this.authService.setProfileInfo(this.profile);
        localStorage.setItem('profileInfo', JSON.stringify(this.profile));
        this.alertService.popSuccess('Profile updated'); //show message
        this.router.navigate(['/profile:id']);
      },
      error => {
        this.loading = false;
        this.alertService.popError(error); //show message
      });
  }
}
