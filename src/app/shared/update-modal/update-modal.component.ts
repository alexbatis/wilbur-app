/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { Component } from '@angular/core';
// NgRx
import { Store, select } from '@ngrx/store';
// Other
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Version } from '@app/models/Version';
import { environment } from '@env/environment.prod';
import { ElectronService } from '@app/providers';
import { YeomanState } from '@app/core/redux';
import { take } from 'rxjs/operators';
import { YeomanGenerator } from '@app/models/YeomanGenerator';

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent {
  /*--------------------MEMBER VARIABLES------------*/
  data: Version = new Version();
  environment = environment;
  appGithubRepo = "https://github.com/alexbatis/wilbur-app";
  generatorGithubRepo = "https://github.com/alexbatis/generator-wilbur";
  yeomanState: YeomanState;
  wilburGenerator: YeomanGenerator;
  versionMismatch = false;

  /*--------------------CONSTRUCTOR-----------------*/
  constructor(
    private store: Store<any>,
    public modalService: NgxSmartModalService,
    private electronService: ElectronService) { }

  /*--------------------FUNCTIONS-------------------*/
  /* Process incoming data when another component injects data to this modal instance */
  dataAdded() {
    this.data = this.modalService.getModal('updateModal').getData();   // scope incoming data
  }

  onOpen() {
    this.store.pipe(take(1), select(s => s.yeoman))
      .subscribe((state: YeomanState) => {
        this.yeomanState = state;
        this.wilburGenerator = state.installedGenerators.value.find(generator => generator.name === 'generator-wilbur');
        if (this.wilburGenerator && this.yeomanState.generatorLatestVersion !== this.wilburGenerator.version)
          this.versionMismatch = true;
      });
  }


  confirm() {
    this.modalService.getModal('updateModal').close();
  }

  openLink(href: string) {
    this.electronService.openBrowserWindow(href);
  }

  onany
  /* Purge injected data when modal is closed or dismissed  */
  onAnyClose() {
    // TODO : will un-scoping vars to remove *ngIf checks?
    this.modalService.getModal('updateModal').removeData();
  }

}
