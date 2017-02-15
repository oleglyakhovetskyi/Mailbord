import { Injectable } from '@angular/core';
import {ToasterModule, ToasterService} from 'angular2-toaster';


@Injectable()
export class AlertService {

private toasterService: ToasterService;

  constructor(toasterService: ToasterService) {
  	this.toasterService = toasterService;
  }

  public popSuccess(message:string='Success') {
  	this.popToast('success', message);
  }

  public popError(message:string='Error') {
  	this.popToast('error', message);
  }

  private popToast(type:string, title:string) {
      var toast = {
        type: type,
        title: title
      };
      
      this.toasterService.pop(toast);
    }

}
