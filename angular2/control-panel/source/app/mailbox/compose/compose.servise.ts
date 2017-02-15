import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API_CONFIG } from '../../shared/api/api.config';

@Injectable()
export class ComposeService {
  constructor (
    private http: Http,
    private cookieService: CookieService,
    ) {};

  private apiConfig = API_CONFIG;
  private galleon = this.apiConfig.galleon;
  private compose = this.apiConfig.compose;


  sendMessage (data: any) {

    let cookieAuth = this.cookieService.get('authentication');
    // console.log('native cookie', document.cookie);
    // console.log('cookieAuth', cookieAuth);
    // console.log('allCookie', this.cookieService.getAll());
    let galleonToken = localStorage.getItem('galleonToken');
    let params = new URLSearchParams();
    console.log(data);
    params.set('to', data.to);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': galleonToken });
    let options=  new RequestOptions({ headers: headers, withCredentials: true });
    console.log(options);
    return this.http.post(this.galleon + this.compose, data, options)
      .map((res:Response) => res)
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
