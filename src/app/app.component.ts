import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import AOS from 'aos';
import { RoutingService } from '@providers/routing/routing.service';
import { UpdateService } from './providers/update.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public electronService: ElectronService,
    private routingService: RoutingService,
    private translate: TranslateService,
    private updateService: UpdateService) {

    translate.setDefaultLang('en');

    this.updateService.checkForAppLatestVersion();
    this.updateService.checkForLatestGeneratorVersion();

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit() {
    AOS.init();
  }

}
