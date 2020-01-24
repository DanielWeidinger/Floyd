import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ChatOverviewComponent } from './components/messaging/chat-overview/chat-overview.component';
import { AuthComponent } from './components/auth/auth/auth.component';


const routes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent,
    children: [
      {path: '', component: LoginComponent}
    ]
  },
  {
    path: 'register',
    component: AuthComponent,
    children: [
      {path: '', component: RegisterComponent}
    ]
  },
  {path: 'chat-overview', component: ChatOverviewComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
