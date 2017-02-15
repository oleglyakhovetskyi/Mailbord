import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../shared/auth/auth.service';
import { AlertService } from '../shared/auth/alert.service';
import { UserService } from '../profile/user.service';



@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  model: any = {
    grant_type: "password"
  };
  loading = false;

  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.buildForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  buildForm(): void {
    this.loginForm = this.fb.group({
      'userName': ['', [
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
    this.model.email = this.model.userName;

    // login to Galleon
    this.authService.loginGalleon(this.model).subscribe(
      data => {
        console.log('login galleon ok', data);
        let galleonInfo = JSON.parse(data._body);
        localStorage.setItem('galleonToken', galleonInfo.token);
        this.cookieService.put('authentication', galleonInfo.token);

        // login to our backend
        this.authService.login(this.model)
          .subscribe(
          data => {
            console.log('login backend ok', data);
            this.loading = false;
            // login successful if there's a jwt token in the response
            if (data && data.access_token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('tokenInfo', JSON.stringify(data));
              this.userService.getUserInfo().subscribe(
                data => {
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
      },
      error => {
        console.log(error);
        this.alertService.popError(error);
        this.loading = false;
      }
    );


  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
}
