import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page.routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonorsComponent } from './donors/donors.component';
import { UserhomeComponent } from './userhome/userhome.component';

@NgModule({
  declarations: [DonorsComponent, UserhomeComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PageModule {}
