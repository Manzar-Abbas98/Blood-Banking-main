import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeroComponent } from './homepage/hero/hero.component';
import { NavbarComponent } from './homepage/navbar/navbar.component';
import { SubnavbarComponent } from './homepage/subnavbar/subnavbar.component';
import { RequestingComponent } from './homepage/requesting/requesting.component';
import { DeatilscardComponent } from './homepage/deatilscard/deatilscard.component';
import { MainfooterComponent } from './homepage/mainfooter/mainfooter.component';
import { CallbackRequestComponent } from './homepage/callback-request/callback-request.component';
import { DonationprocedureComponent } from './homepage/donationprocedure/donationprocedure.component';
import { EligibilityCrieteriaComponent } from './homepage/eligibility-crieteria/eligibility-crieteria.component';
import { FAQSComponent } from './homepage/faqs/faqs.component';
import { SupportingComponent } from './homepage/supporting/supporting.component';
import { TestimotionalComponent } from './homepage/testimotional/testimotional.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { RouterModule } from '@angular/router';
import { DonorsComponent } from './login-success/donors/donors.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MaindashboardComponent,
    HomepageComponent,
    HomepageComponent,
    HeroComponent,
    NavbarComponent,
    SubnavbarComponent,
    RequestingComponent,
    DeatilscardComponent,
    MainfooterComponent,
    CallbackRequestComponent,
    DonationprocedureComponent,
    TestimotionalComponent,
    EligibilityCrieteriaComponent,
    FAQSComponent,
    SupportingComponent,
    LoginSuccessComponent,
    DonorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent, LoginComponent],
  exports: [RouterModule],
})
export class AppModule {}
