import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ReminderFormComponent } from './reminder-form/reminder-form.component';
import { ReminderListComponent } from './reminder-list/reminder-list.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ReminderFormComponent,
    ReminderListComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
