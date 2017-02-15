import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { Observable } from "rxjs/Observable";
import { ChannelService, ConnectionState } from "./services/channel.service";
import { MailboxService } from './mailbox/inbox/mailbox.service';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {

  connectionState$: Observable<string>;

  user: any = {};
  showMenu = true;
  public inboxCounter: number = 0;
  public draftCounter: number = 0;

  //private profile: any;

  constructor(private authService: AuthService, private channelService: ChannelService, private mailboxService: MailboxService, private zone: NgZone) {

    if (this.authService.isLoggedIn()) {
      // Let's wire up to the signalr observables
      this.connectionState$ = this.channelService.connectionState$
        .map((state: ConnectionState) => { return ConnectionState[state]; });

      this.channelService.error$.subscribe(
        (error: any) => { console.warn(error); },
        (error: any) => { console.error("errors$ error", error); }
      );

      // Wire up a handler for the starting$ observable to log the
      //  success/fail result
      this.channelService.starting$.subscribe(
        () => { console.log("signalr service has been started"); },
        () => { console.warn("signalr service failed to start!"); }
      );
    }

  }

  ngOnInit() {

    if (this.authService.isLoggedIn()) {
      this.channelService.start();
    }

    this.channelService.getEventListener().subscribe(event => {

      if (event.type == "onMessage") {
        this.inboxCounter += event.data.length;
        console.log('app.component onMessage', event);
      }
      if (event.type == "readMessage") {
        this.inboxCounter = 0;
        console.log('app.component readMessage')
      }
    });

  }


  isLoggedIn() {
    if (localStorage.getItem('profileInfo')) {
      this.user = JSON.parse(localStorage.getItem('profileInfo'));
      return true;
    }
    else {
      return false
    }
  }

  logout() {
    this.authService.logout();
  }

  testButton() {
    this.mailboxService.Join().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
