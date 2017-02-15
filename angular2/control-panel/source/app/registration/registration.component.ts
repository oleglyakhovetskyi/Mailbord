import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { AlertService } from '../shared/auth/alert.service';


@Component({
    moduleId: module.id,
    selector:'register',
    templateUrl:'registration.component.html'
})
export class RegistrationComponent implements OnInit {

  registerForm:FormGroup;
  model: any = {};
  loading = false;

  constructor(private fb:FormBuilder, private router: Router, private authService: AuthService, private alertService: AlertService ) {}

  ngOnInit():void {
    this.buildForm();
  }

  buildForm():void {
    this.registerForm = this.fb.group({
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
      ],
      'password': ['', [
        Validators.required,
        Validators.minLength(6)
      ]
      ],
      'confirm': ['', [
        Validators.required,
        Validators.minLength(6)
      ]
      ]
    });
  }
  register() {
    this.loading = true;
    this.authService.register(this.model)
      .subscribe(
        data => {
          this.loading = false;
          console.log(data);
          this.alertService.popSuccess('Registration successful'); //show message
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.alertService.popError(error); //show message
          this.loading = false;
        });
  }
}
