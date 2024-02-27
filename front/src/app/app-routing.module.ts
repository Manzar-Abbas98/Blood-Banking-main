import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginSuccessComponent } from './component/login-success/login-success.component';
import { authGuard } from './_guards/auth.guard';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./page/page.module').then((res) => res.PageModule),
  },

  { path: '', component: HomepageComponent },
  {path : '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'loginsuccess', component: LoginSuccessComponent },
      { path: 'dash', component: MaindashboardComponent },
      {path: 'memberList', component: MemberListComponent},
      {path: 'members/:email' , component: MemberDetailComponent},
      {path: 'list' , component: ListComponent},
      {path: 'member/edit' , component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: 'homepage', component: HomepageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
