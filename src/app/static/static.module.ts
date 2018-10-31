/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgsRevealModule } from 'ng-scrollreveal';
/*--------------------CUSTOM------------------------*/
import { LandingComponent } from './landing/landing.component';
import { StaticRoutingModule } from './static-routing.module';

/*-----------------------------------MODULE----------------------------------*/
@NgModule({
  imports: [
    CommonModule,
    NgsRevealModule,
    StaticRoutingModule
  ],
  declarations: [
    LandingComponent
  ]
})
export class StaticModule { }
