import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import {LoginComponent} from './components/login/login.component';
import {ChatOverviewComponent} from './components/chat-overview/chat-overview.component';


const routes: Routes = [
  // { path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // },
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat-overview', component: ChatOverviewComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
