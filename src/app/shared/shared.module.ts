import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonService, RoutingService } from '@app/providers';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { ArgonCardComponent } from './argon-card/argon-card.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { NgrxTextInputComponent } from './ngrx-text-input/ngrx-text-input.component';
import { ArrayPrefixPipe, ValidationErrorMessagePipe, ParamsSubtitlePipe } from '@pipes/index';
import { NgrxSelectInputComponent } from './ngrx-select-input/ngrx-select-input.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxMasonryModule } from 'ngx-masonry';
import { VarDirective } from './NgVar.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { BoilerplateService } from '@app/providers/boilerplate/boilerplate.service';
import { GeneratorService } from '@app/providers/generator/generator.service';
import { DirectorySelectorComponent } from './directory-selector/directory-selector.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { NgsRevealModule } from 'ng-scrollreveal';
import { UpdateService } from '@app/providers/update.service';
import { UpdateModalComponent } from './update-modal/update-modal.component';
import { InstallGeneratorCardComponent } from './install-generator-card/install-generator-card.component';


const COMPONENTS = [
  NavbarComponent,
  FooterComponent,
  PageHeadingComponent,
  ArgonCardComponent,
  NgrxTextInputComponent,
  NgrxSelectInputComponent,
  ArrayPrefixPipe,
  ValidationErrorMessagePipe,
  ParamsSubtitlePipe,
  VarDirective,
  ConfirmationModalComponent,
  DirectorySelectorComponent,
  SpinnerComponent,
  PageHeaderComponent,
  UpdateModalComponent,
  InstallGeneratorCardComponent
];

const SERVICES = [
  CommonService,
  RoutingService,
  BoilerplateService,
  GeneratorService,
  UpdateService
];

const MODULES = [
  FormsModule,
  CommonModule,
  RouterModule,
  NgrxFormsModule,
  NgxSmartModalModule,
  NgxMasonryModule,
  NgSelectModule,
  NgsRevealModule
];

@NgModule({
  imports: [MODULES],
  declarations: [COMPONENTS],
  providers: [SERVICES],
  exports: [MODULES, COMPONENTS]
})
export class SharedModule { }
