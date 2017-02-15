import {Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ComposeService } from  '../compose/compose.servise';
import { ChannelService, ChannelEvent } from "../../services/channel.service";
import { MailboxService } from '../inbox/mailbox.service';
import { AlertService } from '../../shared/auth/alert.service';

class StatusEvent {
  State: string;
  PercentComplete: number;
}

export class Message {
  author: string;
  subject: string;
  date: string;
  text:string;
  State: any;
}



@Component({
    moduleId: module.id,
    selector:'important',
    templateUrl:'../inbox/inbox.component.html'
})
export class ImportantComponent implements OnInit {

  @Input() eventName: string;

  private channel = "tasks";

  message: Message;
  selectedMessage: Message;
  answerForm:FormGroup;
  answer: any = {};

  onSelect(message: Message): void {
    this.selectedMessage = message;
  }

	constructor (private composeSevice: ComposeService, private fb:FormBuilder,
               private channelService: ChannelService, private mailboxService: MailboxService,
               private alertService: AlertService) {}

	public category: any = 'Important';
  public messages: any;


	ngOnInit () {
    this.buildForm();

    this.mailboxService.getAllMessages('important').subscribe(
      data => {
       this.messages = JSON.parse(data._body);
        console.log(this.messages);
      },
      error => {
      	console.log(error);
      });


    this.channelService.sub(this.channel).subscribe(
      (x: ChannelEvent) => {
        switch (x.Name) {
          case this.eventName: { this.appendStatusUpdate(x); }
        }
      },
      (error: any) => {
        console.warn("Attempt to join channel failed!", error);
      }
    )
	}
  buildForm():void {
    this.answerForm = this.fb.group({
      'message': ['']
    });
  }

  private appendStatusUpdate(ev: ChannelEvent): void {
    // Just prepend this to the messages string shown in the textarea
    //
    let date = new Date();
    switch (ev.Data.State) {
      case "starting": {
        this.messages = `${date.toLocaleTimeString()} : starting\n` + this.messages;
        break;
      }

      case "complete": {
        this.messages = `${date.toLocaleTimeString()} : complete\n` + this.messages;
        break;
      }

      default: {
        this.messages = `${date.toLocaleTimeString()} : ${ev.Data.State} : ${ev.Data.PercentComplete} % complete\n` + this.messages;
      }
    }
  }

  sendMessage() {
    this.composeSevice.sendMessage(this.answer)
      .subscribe(
        data => {
          this.alertService.popSuccess('Email has been sent successfully!');
          this.answerForm.reset();
        },
        error => {
          console.log(error);
          this.alertService.popError(error);
        });
  }

  moveToTrash (message: any) {
    this.delete(this.messages, message);
    this.mailboxService.moveToTrash(message)
      .subscribe(
        data => {
          console.log(data);
          // this.delete(this.messages, message);
        },
        error => {
          console.log(error);
          // this.alertService.popError(error); //show message
        });
  }
  moveToImportant (message: any) {
    this.delete(this.messages, message);
    if(message.State == 'important') {
      message.State = false;
    }
    else {
      message.State = 'important';
    }
    this.mailboxService.moveToImportant(message)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
          // this.alertService.popError(error); //show message
        });
  }
 
  // delete obj from array
  private delete(array: any, obj:any) {
    array.splice(array.indexOf(obj), 1);
    console.log(array);
  }
}
