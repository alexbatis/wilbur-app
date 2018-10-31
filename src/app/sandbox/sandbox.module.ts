import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxRootComponent } from './sandbox-root/sandbox-root.component';
import { SharedModule } from '@app/shared/shared.module';
import { SandboxRoutingModule } from '@app/sandbox/sandbox-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [SandboxRootComponent]
})
export class SandboxModule { }
