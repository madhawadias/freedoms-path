import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainDashboardComponent} from "./main-dashboard/main-dashboard.component";
import {ManagerDashboardComponent} from "./manager-dashboard/manager-dashboard.component";


const routes: Routes = [
  { path: 'main-dashboard', component: MainDashboardComponent},
  { path: 'manager-dashboard', component: ManagerDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
