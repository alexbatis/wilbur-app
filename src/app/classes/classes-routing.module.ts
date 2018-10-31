/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*--------------------CUSTOM------------------------*/
import { ClassesRootComponent } from './classes-root/classes-root.component';
import { ClassFormSmartComponent } from './classes-form/class-form-smart/class-form-smart.component';

// URL routing
const routes: Routes = [
  {
    path: 'classes',
    component: ClassesRootComponent
  },
  {
    path: 'classes/form/:action',
    component: ClassFormSmartComponent
  }
  // TODO: figure out catch all redirect
  // {
  //   path: 'classes/*',
  //   redirectTo: 'classes'
  // }
];

/*-----------------------------------MODULE----------------------------------*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
