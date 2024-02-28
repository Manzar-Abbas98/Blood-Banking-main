import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page.routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonorsComponent } from './donors/donors.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { MemberListComponent } from '../member-list/member-list.component';
import { MemberCardsComponent } from '../member-cards/member-cards.component';
import { MemberEditComponent } from '../member-edit/member-edit.component';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    // DonorsComponent,
    // UserhomeComponent,
    // MemberListComponent,
    // MemberCardsComponent,
    // MemberEditComponent,
    // MemberDetailComponent,
    // PhotoEditorComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    RouterModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
})
export class PageModule {}
