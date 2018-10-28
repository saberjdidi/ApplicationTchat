import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RgisterComponent } from './rgister/rgister.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from'@angular/http';
import {RouterModule, Routes} from'@angular/router';
import { HomeComponent } from './home/home.component';
import { SendmessageComponent } from './sendmessage/sendmessage.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from './role.guard';
import { AdduserComponent } from './adduser/adduser.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

const routes : Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RgisterComponent},
  {path : 'home', component : HomeComponent},
  {path : 'send', component : SendmessageComponent, canActivate: [AuthGuard]},
  {path : 'admin', component : AdminComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['admin']}},
  {path : 'adduser', component : AdduserComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['admin']}},
  {path : '', pathMatch: 'full', redirectTo: 'login'}
 

]

@NgModule({
  declarations: [
    AppComponent,
    RgisterComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    SendmessageComponent,
    AdminComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
