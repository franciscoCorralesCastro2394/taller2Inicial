import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirestoreSettingsToken } from  '@angular/fire/firestore' ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AboutUsComponent } from './components/about-us/about-us.component'; 
import { SecureComponent } from './components/secure/secure.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ElementComponent } from './components/element/element.component';
import { LoginService } from './services/login/login.service';
import { DataService } from './services/data/data.service';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { AuthorizationGuard } from './guards/authorization/authorization.guard';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoveryComponent } from './components/recovery/recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent, 
    SecureComponent,
    PrincipalComponent,
    ElementComponent, 
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} } , DataService, LoginService, AuthenticationGuard, AuthorizationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
