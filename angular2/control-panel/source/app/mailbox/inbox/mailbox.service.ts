import { Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../../shared/api/api.service';
import { API_CONFIG } from '../../shared/api/api.config';

@Injectable()
export class MailboxService {
  constructor (
    private http: Http,
    private apiService: ApiService,
    private zone: NgZone) {};

  private apiConfig = API_CONFIG;
  private apiPrefix = this.apiConfig.apiPreffix;
  private domain = this.apiConfig.domain;
  private inbox = this.apiConfig.api.inbox;
  private trash = this.apiConfig.api.trash;
  private important = this.apiConfig.api.important;
  private remove = this.apiConfig.api.remove;
  private sendtest = this.apiConfig.api.sendtest;



  getAllMessages(category: any) {
    let params = new URLSearchParams();
    params.set('parameter', category);
    let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    let profileInfo = JSON.parse(localStorage.getItem('profileInfo'));
    // console.log(profileInfo);
    let headers = new Headers({ 'Authorization': 'Bearer ' + tokenInfo.access_token });
    let options = new RequestOptions({
      // Have to make a URLSearchParams with a query string
      search: params,
      headers: headers });
    // console.log(options);
    return this.http.get(this.domain + this.apiPrefix +  this.inbox, options)
      .map((res:Response) => res)
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  Join() {
    let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + tokenInfo.access_token });
    let options = new RequestOptions({
      headers: headers });
    return this.http.get(this.domain + this.apiPrefix +  this.sendtest, options)
      .map((res:Response) => res)
      .catch((error:any) => Observable.throw(error || 'Server error'));

  }
  moveToTrash (message: any) {
    return this.apiService.put(this.trash, message);

  }
  moveToImportant (message: any) {
    return this.apiService.put(this.important, message);

  }
  deleteForEver (message: any) {
    let params = new URLSearchParams();
    params.set('parameter', message.EId);
    let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + tokenInfo.access_token, 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      search: params,
      headers: headers });
      console.log(options);
    return this.http.delete(this.domain + this.apiPrefix +  this.remove, options)
      .map((res:Response) => res)
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

}
