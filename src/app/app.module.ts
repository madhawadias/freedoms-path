import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {environment} from "../environments/environment";
import * as firebase from "firebase";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {DataTablesModule} from "angular-datatables";
import {CountdownModule} from "ngx-countdown";
firebase.initializeApp(environment.firebaseConfig)

@NgModule({
  declarations: [
    AppComponent,
    ManagerDashboardComponent,
    NavBarComponent,
    MainDashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    DataTablesModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
