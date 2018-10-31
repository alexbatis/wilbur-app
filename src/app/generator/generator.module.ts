/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Other
import { NgsRevealModule } from 'ng-scrollreveal';
/*--------------------CUSTOM------------------------*/
import { SharedModule } from '../shared/shared.module';
import { GeneratorRootComponent } from './generator-root/generator-root.component';
import { GeneratorBoilerplateComponent } from './generator-boilerplate/generator-boilerplate.component';
import { PromptComponent } from './prompt/prompt.component';
import { FormsModule } from '@angular/forms';
import { GeneratorAppComponent } from './generator-app/generator-app.component';
import { GeneratorClassComponent } from './generator-class/generator-class.component';

/*-----------------------------------MODULE----------------------------------*/
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgsRevealModule
  ],
  declarations: [
    GeneratorRootComponent,
    GeneratorBoilerplateComponent,
    PromptComponent,
    GeneratorAppComponent,
    GeneratorClassComponent
  ]
})
export class GeneratorModule { }
