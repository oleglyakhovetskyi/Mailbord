import { NgModule }                     from '@angular/core';
import { RouterModule, Routes, CanActivate }         from '@angular/router';
import { RegistrationComponent }      from './registration/registration.component';
import { LoginComponent }             from './login/login.component';
import { InboxComponent }           from './mailbox/inbox/inbox.component';
import { SentComponent }           from './mailbox/sent/sent.component';
import { SpamComponent }           from './mailbox/spam/spam.component';
import { TrashComponent }           from './mailbox/trash/trash.component';
import { ImportantComponent }           from './mailbox/important/important.component';
import { DraftComponent }           from './mailbox/draft/draft.component';
import { ComposeComponent }         from './mailbox/compose/compose.component';
import { ProfileComponent }         from './profile/profile.component';
import { AccountSettingsComponent } from './profile/account-settings.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { SkipGuard } from './shared/auth/skip.guard';
import { Error404Component } from './shared/errors/404.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/registration',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [SkipGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SkipGuard]
  },
   {
    path: 'mailbox/inbox',
    component: InboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mailbox/sent',
    component: SentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mailbox/important',
    component: ImportantComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mailbox/draft',
    component: DraftComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mailbox/spam',
    component: SpamComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mailbox/trash',
    component: TrashComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'compose',
    component: ComposeComponent
  },
  {
    path: 'profile:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: Error404Component
  }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}