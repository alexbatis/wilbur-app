import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CoreModule } from '@app/core';
import { CommonService } from '@app/providers/common/common.service';
import { VarDirective } from '@app/shared/NgVar.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgsRevealModule } from 'ng-scrollreveal';
import { SharedModule } from './shared/shared.module';
import { StaticModule } from './static';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    NgsRevealModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    CoreModule,
    SharedModule,
    StaticModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (HttpLoaderFactory),
    //     deps: [HttpClient]
    //   }
    // })
  ],
  providers: [
    CommonService,
    ElectronService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }