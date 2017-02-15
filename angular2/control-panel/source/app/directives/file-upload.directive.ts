import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UserService } from '../profile/user.service';
import { AlertService } from '../shared/auth/alert.service';

import { AccountSettingsComponent } from '../profile/account-settings.component';


@Component({
  selector: 'file-upload',
  template: `
<img class="img-fluid" src="{{user.Image }}" alt="Photo">
<input type="file" [multiple]="multiple" accept=".png,.jpg,.jpeg">
`
})
export class FileUploadComponent implements OnInit {
  @Input() multiple: boolean = false;

  user: any = {
  };

  constructor( private el: ElementRef, private userService: UserService, private alertService: AlertService, private accountSettingsComponent: AccountSettingsComponent) {}


  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('profileInfo'));

  }

  upload() {
    this.accountSettingsComponent.loading = true;
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('[type="file"]');
    let fileCount: number = inputEl.files.length;
    this.user.Image = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        this.user.Image.append('file[]', inputEl.files.item(i));
      }
      this.userService.uploadImage(this.user.Image).subscribe(
        data => {
          this.accountSettingsComponent.loading = false;
          console.log(JSON.parse(data._body));
          this.user = JSON.parse(data._body);
          localStorage.setItem("profileInfo", data._body);
          // this.user.Image = data._body;
          this.alertService.popSuccess('Avatar has been successfully updated');
        },
        error => {
          this.accountSettingsComponent.loading = false;
          console.log(error);
          this.alertService.popError(error);
        });

    }
  }
}
