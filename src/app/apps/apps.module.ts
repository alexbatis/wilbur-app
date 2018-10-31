/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Other
import { NgsRevealModule } from 'ng-scrollreveal';
/*--------------------CUSTOM------------------------*/
// import { AppsRootComponent } from './classes-root/classes-root.component';
// import { ClassFormSmartComponent } from './classes-form/class-form-smart/class-form-smart.component';
// import { ClassFormDumbComponent } from './classes-form/class-form-dumb/class-form-dumb.component';
import { SharedModule } from '../shared/shared.module';
import { AppsRootComponent } from './apps-root/apps-root.component';
import { AppFormSmartComponent } from './apps-form/app-form-smart/app-form-smart.component';
import { AppFormDumbComponent } from './apps-form/app-form-dumb/app-form-dumb.component';
import { FormsModule } from '@angular/forms';
// import { MemberVariableFormCardComponent } from './classes-form/member-variable-form-card/member-variable-form-card.component';
// import { DecoratorListFormComponent } from './classes-form/decorator-list/decorator-list.component';
// import { DecoratorFormModalComponent } from './classes-form/decorator-form-modal/decorator-form-modal.component';

/*-----------------------------------MODULE----------------------------------*/
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgsRevealModule,
    FormsModule
  ],
  declarations: [
    AppsRootComponent,
    AppFormSmartComponent,
    AppFormDumbComponent
    // ClassFormSmartComponent,
    // ClassFormDumbComponent,
    // MemberVariableFormCardComponent,
    // DecoratorListFormComponent,
    // DecoratorFormModalComponent
  ]
})
export class AppsModule { }
