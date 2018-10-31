import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SandboxRootComponent } from '@app/sandbox/sandbox-root/sandbox-root.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxRootComponent
  }
  // {
  //   path: 'classes/*',
  //   redirectTo: 'classes'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxRoutingModule { }
