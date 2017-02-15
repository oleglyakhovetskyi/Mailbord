import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { API_CONFIG } from '../api/api.config';
import { ApiService } from '../api/api.service';


@Injectable()
export class AuthService {
    constructor(private http: Http, private apiService: ApiService, private router: Router) {
      //this.loggedIn = !!localStorage.getItem('auth_token');
    }

    private apiConfig = API_CONFIG;
    private domain = this.apiConfig.domain;
    private api = this.apiConfig.apiPreffix;

    private apiLogin = this.apiConfig.api.login;
    private apiRegistration = this.apiConfig.api.registration;
    private galleon = this.apiConfig.galleon;
    private galleonLogin = this.apiConfig.galleonLogin;


    // private profileInfo: any;



    // getProfileInfo() {
    //     this.profileInfo = JSON.parse(localStorage.getItem('profileInfo'));
    //     console.log('getProfileInfo', this.profileInfo);
    //     return this.profileInfo;
    // }

    // setProfileInfo(model: any) {
    //     console.log('setProfileInfo', model);

    //     localStorage.setItem('profileInfo', JSON.stringify(model));
    // }

    register(data: any) {
        return this.apiService.post(this.apiRegistration, data);
    }



    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('tokenInfo');
        localStorage.removeItem('profileInfo');
        localStorage.removeItem('galleonToken');
        this.router.navigate(['/login']);
    }

    login(data: any) {
        return this.post(this.apiLogin, this.serialize(data));
    }

    isLoggedIn() {
        if(localStorage.getItem('profileInfo')){
          return true;
        }
        else {
            return false
        }
    }
    loginGalleon(data: any) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.post(this.galleon  +  this.galleonLogin, data, options)
        .map((res:Response) => res)
        .catch((error:any) => Observable.throw(error || 'Server error'));
    }


    // use this method only or login with special headers
    private post(url: string, body: any) : Observable<any> {

        console.log("post:", this.domain + this.api + url);
        console.log("data", body);

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.domain + this.api + url, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error || 'Server error'));
     }

    private serialize(data:any) {
        let modelString: string = '';

        for (let prop in data) {
          modelString += prop + '=' + data[prop] + '&';
        }

        modelString = modelString.slice(0, modelString.length-1);

        return modelString;
    }
}
