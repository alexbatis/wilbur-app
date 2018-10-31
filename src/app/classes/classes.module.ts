/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Other
import { NgsRevealModule } from 'ng-scrollreveal';
/*--------------------CUSTOM------------------------*/
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesRootComponent } from './classes-root/classes-root.component';
import { ClassFormSmartComponent } from './classes-form/class-form-smart/class-form-smart.component';
import { ClassFormDumbComponent } from './classes-form/class-form-dumb/class-form-dumb.component';
import { SharedModule } from '../shared/shared.module';
import { MemberVariableFormCardComponent } from './classes-form/member-variable-form-card/member-variable-form-card.component';
import { DecoratorListFormComponent } from './classes-form/decorator-list/decorator-list.component';
import { DecoratorFormModalComponent } from './classes-form/decorator-form-modal/decorator-form-modal.component';

/*-----------------------------------MODULE----------------------------------*/
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ClassesRoutingModule,
    NgsRevealModule
  ],
  declarations: [
    ClassesRootComponent,
    ClassFormSmartComponent,
    ClassFormDumbComponent,
    MemberVariableFormCardComponent,
    DecoratorListFormComponent,
    DecoratorFormModalComponent
  ]
})
export class ClassesModule { }
