import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material/material.module';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ChatOverviewComponent } from './components/chat-overview/chat-overview.component';
import {RouterModule} from '@angular/router';
import {MatGridListModule, MatSidenavModule} from '@angular/material';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    LoginComponent,
    ChatOverviewComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSidenavModule,
    MatGridListModule
    HttpClientModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
