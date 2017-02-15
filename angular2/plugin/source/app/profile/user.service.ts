import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api/api.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { API_CONFIG } from '../shared/api/api.config';

@Injectable()
export class UserService {
  constructor ( private apiService: ApiService, private http: Http) {};

  private apiConfig = API_CONFIG;
  private apiProfileUpdate = this.apiConfig.api.profileupdate;
  private apiProfileData = this.apiConfig.api.profiledata;
  private apiProfileImage = this.apiConfig.api.updatewithimage;
  private apiPrefix = this.apiConfig.apiPreffix;
  private domain = this.apiConfig.domain;



  updateProfile(data: any) {
    let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenInfo.access_token });
    let options=  new RequestOptions({ headers: headers });
    return this.http.put(this.domain + this.apiPrefix +  this.apiProfileUpdate, data, options)
      .map((res:Response) => res)
      .catch((error:any) => Observable.throw(error || 'Server error'));

  }
  getUserInfo(){
    return this.apiService.get(this.apiProfileData);
  }
  uploadImage(data: any) {
    let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + tokenInfo.access_token});
    let options=  new RequestOptions({ headers: headers });
     return this.http.post(this.domain + this.apiPrefix + this.apiProfileImage, data, options)
        .map((res:Response) => res)
        .catch((error:any) => Observable.throw(error || 'Server error'));

  }

}
