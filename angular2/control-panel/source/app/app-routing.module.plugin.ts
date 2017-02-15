import { NgModule }                     from '@angular/core';
import { RouterModule, Routes, CanActivate }         from '@angular/router';
import { LoginComponentPlugin }             from './login/login.component.plugin';
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


const routes: Routes = [
  {
    path: 'plugin',
    redirectTo: 'mailbox/inbox',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponentPlugin
  },
   {
    path: 'mailbox/:category',
    component: InboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sent',
    component: SentComponent
  },
  {
    path: 'important',
    component: ImportantComponent
  },
  {
    path: 'draft',
    component: DraftComponent
  },
  {
    path: 'spam',
    component: SpamComponent
  },
  {
    path: 'trash',
    component: TrashComponent
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
  }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModulePlugin {}