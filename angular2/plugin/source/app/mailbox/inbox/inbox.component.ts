import {Component, OnInit, OnDestroy} from '@angular/core';
import {ApiService} from '../../shared/api/api.service';

import { API_CONFIG } from '../../shared/api/api.config';

import {Subscription } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    moduleId: module.id,
    selector:'inbox',
    templateUrl:'inbox.component.html'
})
export class InboxComponent implements OnInit {

	
	constructor (private apiService: ApiService, private activatedRoute: ActivatedRoute) {}

	private apiConfig = API_CONFIG;
	public mails: any[];
	public title: any;
	
	ngOnInit () {
		this.activatedRoute.params.subscribe(
	      (param: any) => {
	        let category = param['category'];
	        console.log(category);
	        this.title = category;
	      });


		this.apiService.get(this.apiConfig.api.inbox).subscribe(
		data => {
			console.log(data);
			this.mails = data;
        },
        error => {
        	console.log(error);
        });
	}

	  // ngOnDestroy() {
	  //   // prevent memory leak by unsubscribing
	  //   this.title.unsubscribe();
	  // }

 }
