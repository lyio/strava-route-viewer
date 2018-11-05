import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutesListContainerComponent } from './routes-list-container/routes-list-container.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RoutesListComponent } from './routes-list-component/routes-list.component';
import { RouteComponent } from './route/route.component';
import { PosterFooterComponent } from './poster-footer/poster-footer.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutesListContainerComponent,
    RoutesListComponent,
    RouteComponent,
    PosterFooterComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
