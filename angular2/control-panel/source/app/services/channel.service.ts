import { Injectable, Inject, NgZone, EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { MailboxService } from '../mailbox/inbox/mailbox.service';


export class SignalrWindow extends Window {
  $: any;
}

export enum ConnectionState {
  Connecting = 1,
  Connected = 2,
  Reconnecting = 3,
  Disconnected = 4
}

export class ChannelConfig {
  url: string;
  hubName: string;
  channel: string;
}

export class ChannelEvent {
  Name: string;
  ChannelName: string;
  Timestamp: Date;
  Data: any;
  Json: string;

  constructor() {
    this.Timestamp = new Date();
  }
}

class ChannelSubject {
  channel: string;
  subject: Subject<ChannelEvent>;
}

@Injectable()
export class ChannelService {

  starting$: Observable<any>;
  connectionState$: Observable<ConnectionState>;
  error$: Observable<string>;

  public listener: EventEmitter<any> = new EventEmitter();
  private connectionStateSubject = new Subject<ConnectionState>();
  private startingSubject = new Subject<any>();
  private errorSubject = new Subject<any>();

  private hubConnection: any;
  private hubProxy: any;

  private subjects = new Array<ChannelSubject>();

  constructor(
    @Inject(SignalrWindow) private window: SignalrWindow,
    @Inject("channel.config") private channelConfig: ChannelConfig,
    private mailboxService: MailboxService,
    private zone: NgZone
  ) {
    if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
      throw new Error("The variable '$' or the .hubConnection() function are not defined...please check the SignalR scripts have been loaded properly");
    }

    // Set up our observables
    //
    this.connectionState$ = this.connectionStateSubject.asObservable();
    this.error$ = this.errorSubject.asObservable();
    this.starting$ = this.startingSubject.asObservable();

    this.hubConnection = this.window.$.hubConnection();
    this.hubConnection.url = channelConfig.url;
    this.hubProxy = this.hubConnection.createHubProxy(channelConfig.hubName);

    // Define handlers for the connection state events
    //
    this.hubConnection.stateChanged((state: any) => {
      let newState = ConnectionState.Connecting;

      switch (state.newState) {
        case this.window.$.signalR.connectionState.connecting:
          newState = ConnectionState.Connecting;
          break;
        case this.window.$.signalR.connectionState.connected:
          newState = ConnectionState.Connected;
          break;
        case this.window.$.signalR.connectionState.reconnecting:
          newState = ConnectionState.Reconnecting;
          break;
        case this.window.$.signalR.connectionState.disconnected:
          newState = ConnectionState.Disconnected;
          break;
      }

      // Push the new state on our subject
      //
      this.connectionStateSubject.next(newState);
    });

    // Define handlers for any errors
    //
    this.hubConnection.error((error: any) => {
      // Push the error on our subject
      //
      this.errorSubject.next(error);
    });

    this.hubProxy.on("onMessage", (channel: string, ev: ChannelEvent) => {
      this.listener.emit({"type": "onMessage", "data": channel});
    });

  }


  start(): void {
    this.hubConnection.start()
      .done(() => {
        // console.log('started ok');
        this.startingSubject.next();
      })
      .fail((error: any) => {
        this.startingSubject.error(error);
      });
  }

  getEventListener() {
    return this.listener;
  }

  sub(channel: string): Observable<ChannelEvent> {

    let channelSub = this.subjects.find((x: ChannelSubject) => {
      return x.channel === channel;
    }) as ChannelSubject;

    if (channelSub !== undefined) {
      // console.log(`Found existing observable for ${channel} channel`, channelSub)
      return channelSub.subject.asObservable();
    }

    channelSub = new ChannelSubject();
    channelSub.channel = channel;
    channelSub.subject = new Subject<ChannelEvent>();
    this.subjects.push(channelSub);

    this.starting$.subscribe(() => {
      // console.log('starting to subscribe to', channel);
      let profileInfo = JSON.parse(localStorage.getItem('profileInfo'));
      this.hubProxy.invoke("Join", profileInfo.UserName)
        .done(() => {
          // console.log(`Successfully subscribed to ${channel} channel`);
        })
        .fail((error: any) => {
          channelSub.subject.error(error);
        });
    },
      (error: any) => {
        channelSub.subject.error(error);
      });

    return channelSub.subject.asObservable();
  }

  publish(ev: ChannelEvent): void {
    this.hubProxy.invoke("Publish", ev);
  }

}
