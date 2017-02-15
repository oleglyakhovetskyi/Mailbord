import { Injectable }    from '@angular/core';
import {Location} from '@angular/common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API_CONFIG } from './api.config';

@Injectable()
export class ApiService {
     constructor (private http: Http, private location: Location) {}

     private apiConfig = API_CONFIG;
	 private domain = this.apiConfig.domain;
     private api = this.apiConfig.apiPreffix;

     get(url: string) : Observable<any> {
         console.log("Request get:", this.domain + this.api + url);
         return this.http.get(this.domain + this.api + url, this.headersOptions())
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.error || 'Server error'));
     }
     post(url: string, body: any) : Observable<any> {
        console.log("Request post:", this.domain + this.api + url);
        console.log(body);
        return this.http.post(this.domain + this.api + url, body, this.headersOptions())
                         .map((res:Response) => res)
                         .catch((error:any) => Observable.throw(error || 'Server error'));
     }
     put(url: string, body: any) : Observable<any> {
        console.log("Request put:", this.domain + this.api + url);
        console.log(body);
        return this.http.put(this.domain + this.api + url, body, this.headersOptions())
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.error || 'Server error'));
     }
     delete(url: string) : Observable<any> {
        console.log("Request delete:", this.domain + this.api + url);
        return this.http.delete(this.domain + this.api + url, this.headersOptions())
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.error || 'Server error'));
     }

    // private helper method
    private headersOptions() {

         let headers;
         let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
        if (tokenInfo && tokenInfo.access_token) {

            console.log('security request');
            headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenInfo.access_token, 'Access-Control-Allow-Origin': '*' });
        }
        else {
            console.log('primary request');
            headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        }
        return new RequestOptions({ headers: headers, withCredentials: true });
    }

}
