/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
/*--------------------CUSTOM------------------------*/
import { environment } from '@env/environment';
// Reducers
import {
  metaReducers,
  yeomanReducer,
  appsReducer,
  classesReducer,
  classFormReducer,
  YEOMAN_SELECTOR,
  CLASSES_SELECTOR,
  APPS_SELECTOR,
  CLASS_FORM_SELECTOR,
  YeomanEffects,
  APP_FORM_SELECTOR,
  appFormReducer,
  ClassesEffects
} from '@redux/index';
import { ClassesModule } from '@app/classes';
import { SandboxModule } from '@app/sandbox/sandbox.module';
import { AppsModule } from '@app/apps';
import { GeneratorModule } from '@app/generator/generator.module';
import { FormsModule } from '@angular/forms';

/*-----------------------------------MODULE DEFINITION-----------------------*/
@NgModule({
  imports: [
    // Angular
    CommonModule,
    HttpClientModule,
    ClassesModule,
    SandboxModule,
    AppsModule,
    GeneratorModule,

    // NgRx
    StoreModule.forRoot({}, { metaReducers }),
    StoreModule.forFeature(YEOMAN_SELECTOR, yeomanReducer),
    StoreModule.forFeature(APPS_SELECTOR, appsReducer),
    StoreModule.forFeature(CLASSES_SELECTOR, classesReducer),
    StoreModule.forFeature(CLASS_FORM_SELECTOR, classFormReducer),
    StoreModule.forFeature(APP_FORM_SELECTOR, appFormReducer),

    EffectsModule.forRoot([
      YeomanEffects,
      ClassesEffects
    ]),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [],
  providers: [],
  exports: [TranslateModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `/assets/i18n/`,
    '.json'
  );
}
