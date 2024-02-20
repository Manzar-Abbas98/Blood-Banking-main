import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginSuccessComponent } from './component/login-success/login-success.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./page/page.module').then((res) => res.PageModule),
  },

  { path: '', component: HomepageComponent },
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
