import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule }   from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ToasterModule, ToasterService} from 'angular2-toaster';

import { AppComponent }  from './app.component';
import { RegistrationComponent }      from './registration/registration.component';
import { LoginComponent }             from './login/login.component';
import { EmailValidator } from './directives/email-validator.directive';
import { EqualValidator } from './directives/equal-validator.directive';
import { FileUploadComponent } from './directives/file-upload.directive';
import { InboxComponent }           from './mailbox/inbox/inbox.component';
import { SentComponent }           from './mailbox/sent/sent.component';
import { SpamComponent }           from './mailbox/spam/spam.component';
import { TrashComponent }           from './mailbox/trash/trash.component';
import { ImportantComponent }           from './mailbox/important/important.component';
import { DraftComponent }           from './mailbox/draft/draft.component';
import { ComposeComponent }         from './mailbox/compose/compose.component';
import { ProfileComponent }         from './profile/profile.component';
import { AccountSettingsComponent } from './profile/account-settings.component'

import { AuthGuard } from './shared/auth/auth.guard';
import { ApiService } from './shared/api/api.service';
import { AlertService } from './shared/auth/alert.service';
import { AuthService } from './shared/auth/auth.service';
import { ComposeService } from  './mailbox/compose/compose.servise';
import {  UserService }  from './profile/user.service'



@NgModule({
    imports:      [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpModule,
        ToasterModule
    ],

    declarations: [
        AppComponent,
        InboxComponent,
        SentComponent,
        SpamComponent,
        TrashComponent,
        ImportantComponent,
        DraftComponent,
        ComposeComponent,
        RegistrationComponent,
        LoginComponent,
        ProfileComponent,
        AccountSettingsComponent,
        EmailValidator,
        EqualValidator,
        FileUploadComponent
      ],
    providers: [AlertService, AuthGuard, ApiService, AuthService, ComposeService, UserService, ToasterService],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
