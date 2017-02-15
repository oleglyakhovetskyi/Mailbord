import { Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../profile/user.service';
import {Observable} from 'rxjs/Rx';
import { AlertService } from '../shared/auth/alert.service';


@Component({
  selector: 'file-upload',
  template: '<input type="file" [multiple]="multiple" accept=".png,.jpg">'
})
export class FileUploadComponent {
  @Input() multiple: boolean = false;

  constructor(private http: Http, private el: ElementRef, private userService: UserService, private alertService: AlertService) {}

  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('[type="file"]');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('file[]', inputEl.files.item(i));
      }
      this.userService.uploadImage(formData).subscribe(
        data => {
          console.log(data);
          this.alertService.popSuccess('Avatar has been successfully updated');
        },
        error => {
          console.log(error);
          this.alertService.popError(error);
        });

    }
  }
}
