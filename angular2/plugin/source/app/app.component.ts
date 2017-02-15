import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth/auth.service';

@Component({
  moduleId: module.id,
  selector:'app',
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {

  showMenu = true;

  private profile: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // let fullProfile = JSON.parse(localStorage.getItem('profileInfo'));
    // this.profile = fullProfile.Name;
  }


  isLoggedIn() {
    if(localStorage.getItem('tokenInfo')){
      return true;
    }
    else {
    	return false
    }
  }

  logout() {
  	this.authService.logout();    
  }

  

}