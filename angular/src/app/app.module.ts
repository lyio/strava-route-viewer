import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { RoutesListContainerComponent } from './routes-list-container/routes-list-container.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RoutesListComponent } from './routes-list-component/routes-list.component';
import { RouteComponent } from './route/route.component';
import { PosterFooterComponent } from './poster-footer/poster-footer.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CanvasExporterComponent } from './canvas-exporter/canvas-exporter.component';
import { AuthorizeComponent } from './authorize/authorize.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'authorize', component: AuthorizeComponent }
];

@NgModule({
  declarations: [
    MainComponent,
    AppComponent,
    RoutesListContainerComponent,
    RoutesListComponent,
    RouteComponent,
    PosterFooterComponent,
    ConfigurationComponent,
    CanvasExporterComponent,
    AuthorizeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    HttpClient,
    FormBuilder
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
