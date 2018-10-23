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
import { ListusersComponent } from './listusers/listusers.component';
import { SendmessageComponent } from './sendmessage/sendmessage.component';

const routes : Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RgisterComponent},
  {path : 'home', component : HomeComponent},
  {path : 'user', component : ListusersComponent},
  {path : 'send', component : SendmessageComponent},
  {path : '', pathMatch: 'full', redirectTo: 'login'}
 

]

@NgModule({
  declarations: [
    AppComponent,
    RgisterComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    ListusersComponent,
    SendmessageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
