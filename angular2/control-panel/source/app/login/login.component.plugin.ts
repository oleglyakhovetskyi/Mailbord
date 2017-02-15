import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../shared/auth/auth.service';
import { AlertService } from '../shared/auth/alert.service';
import { UserService } from '../profile/user.service';



@Component({
    moduleId: module.id,
    selector:'login',
    templateUrl:'login.component.plugin.html'
})
export class LoginComponentPlugin implements OnInit {

  loginForm:FormGroup;
  model: any = {
    grant_type: "password"
  };
  loading = false;

  returnUrl: string;

  constructor(private fb:FormBuilder, private route: ActivatedRoute, private router: Router,
              private authService: AuthService, private userService: UserService, private alertService: AlertService) {

  }

	ngOnInit(){
    this.buildForm();
    // this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}


  buildForm():void {
    this.loginForm = this.fb.group({
      'email': ['', [
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

  login() {
    this.loading = true;
    this.authService.loginGalleon(this.model).subscribe(
      data => {
        console.log(data);
        this.loading = false;
      },
      error => {
        this.alertService.popError(JSON.parse(error._body).error_description || error);
        this.loading = false;
      }
    );
    
    this.authService.login(this.model)
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          // login successful if there's a jwt token in the response
          if (data && data.access_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('tokenInfo', JSON.stringify(data));
                this.userService.getUserInfo().subscribe(
                  data => {
                    console.log('login', data);
                    // this.authService.setProfileInfo(data);
                    localStorage.setItem('profileInfo', JSON.stringify(data));
                    this.router.navigate(['/mailbox/inbox']);
                  }
                );


          }

        },
        error => {
          this.alertService.popError(JSON.parse(error._body).error_description || error);
          this.loading = false;
        });
  }



}
