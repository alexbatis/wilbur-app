/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*--------------------CUSTOM------------------------*/
import { LandingComponent } from './landing/landing.component';

// URL routing

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  }
];

/*-----------------------------------MODULE----------------------------------*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
