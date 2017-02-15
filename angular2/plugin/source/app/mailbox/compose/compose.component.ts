import {Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComposeService } from  './compose.servise';

@Component({
  moduleId: module.id,
  selector:'compose',
  templateUrl:'compose.component.html'
})
export class ComposeComponent implements OnInit{

  mailForm:FormGroup;
  model: any = {};

  constructor(private fb:FormBuilder, private composeSevice: ComposeService){}

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
    this.composeSevice.sendMessage(this.model)
      .subscribe(
        data => {
          console.log(data);
         this.mailForm.reset();
        },
        error => {
          console.log(error);
        });


  }

}
