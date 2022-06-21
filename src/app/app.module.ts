import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SerieDetailComponent } from './components/serie-detail/serie-detail.component';
import { SerieSearchComponent } from './components/serie-search/serie-search.component';
import { SerieComponent } from './components/serie/serie.component';

@NgModule({
  declarations: [
    AppComponent,
    SerieComponent,
    SerieDetailComponent,
    MessagesComponent,
    DashboardComponent,
    SerieSearchComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
