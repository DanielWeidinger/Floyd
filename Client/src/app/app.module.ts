import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatSidenavModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';
import { LoginComponent } from './components/auth/login/login.component';
import { ChatOverviewComponent } from './components/messaging/chat-overview/chat-overview.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthComponent } from './components/auth/auth/auth.component';
import { ChatComponent } from './components/messaging/chat-overview/chat/chat.component';
import { FooterComponent } from './components/messaging/footer/footer.component';
import { ChatPartnerComponent } from './components/messaging/footer/chat-partner/chat-partner.component';
import { MessageComponent } from './components/messaging/chat-overview/chat/message/message.component';
import { MessagingService } from './services/messaging.service';
import { AddContactDialogComponent } from './components/messaging/dialogs/add-contact-dialog/add-contact-dialog.component';
import { UserInfoComponent } from './components/messaging/footer/user-info/user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatOverviewComponent,
    RegisterComponent,
    AuthComponent,
    ChatComponent,
    FooterComponent,
    ChatPartnerComponent,
    MessageComponent,
    AddContactDialogComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule,
    MatSidenavModule,
    MatGridListModule,
    HttpClientModule,
    FlexLayoutModule,
    MatListModule,
    DragDropModule,
    MatBadgeModule
  ],
  providers: [
    AuthService,
    SocketService,
    MessagingService,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddContactDialogComponent]
})
export class AppModule { }
