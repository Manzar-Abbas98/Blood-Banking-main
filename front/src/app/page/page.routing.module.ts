import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './page.component';
import { DonorsComponent } from './donors/donors.component';
import { UserhomeComponent } from './userhome/userhome.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // { path: '', component: FirstMainComponent },
      { path: 'donors', component: DonorsComponent },
      { path: 'userhome', component: UserhomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
