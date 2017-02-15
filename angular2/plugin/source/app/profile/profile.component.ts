import {Component, OnInit} from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  moduleId: module.id,
  selector:'profile:id',
  templateUrl: "profile.component.html",
})
export class ProfileComponent implements OnInit{
  user: any = {};

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {

    // this.user = this.authService.getProfileInfo();

    if(	!localStorage.getItem('profileInfo')) {
    	this.user = this.userService.getUserInfo().subscribe(
	        data => {
            console.log(data);
	          localStorage.setItem('profileInfo', JSON.stringify(data));
    		    this.user = JSON.parse(localStorage.getItem('profileInfo'));

	        }
	     );
    }
    else {
    	this.user = JSON.parse(localStorage.getItem('profileInfo'));
    }

  }

}
