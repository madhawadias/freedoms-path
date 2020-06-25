import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainDashboardComponent} from "./main-dashboard/main-dashboard.component";
import {ManagerDashboardComponent} from "./manager-dashboard/manager-dashboard.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  { path: 'main-dashboard', component: MainDashboardComponent},
  { path: 'manager-dashboard', component: ManagerDashboardComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
