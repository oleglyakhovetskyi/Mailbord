import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComposeService } from  './compose.servise';
import { AlertService } from '../../shared/auth/alert.service';

@Component({
  moduleId: module.id,
  selector:'compose',
  templateUrl:'compose.component.html'
})
export class ComposeComponent implements OnInit{

  mailForm:FormGroup;
  model: any = {};

  constructor(private fb:FormBuilder,
              private composeService: ComposeService,
              private alertService: AlertService,
              private router: Router){}

  ngOnInit(){
    this.buildForm();
  }

  buildForm():void {
    this.mailForm = this.fb.group({
      'email': ['', [
        Validators.required
      ]
      ],
      'subject': ['', [
        Validators.maxLength(50)
      ]
      ],
      'message':['', [
        Validators.required
      ]
      ]
    });
  }
  sendMessage(){
    // set theme by default
    if(!this.model.subject) {
      this.model.subject = 'No theme';
    }
    console.log(this.model);
    this.composeService.sendMessage(this.model)
      .subscribe(
        data => {
          this.alertService.popSuccess('Email has been sent successfully!');
          this.mailForm.reset();
          this.router.navigate(['/mailbox/inbox']);
        },
        error => {
          console.log(error);
          this.alertService.popError(error);
        });


  }

}
