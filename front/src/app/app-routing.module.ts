import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { DonorsComponent } from './login-success/donors/donors.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'donors', component: DonorsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: MaindashboardComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },

  { path: 'homepage', component: HomepageComponent },
  { path: 'loginsuccess', component: LoginSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
