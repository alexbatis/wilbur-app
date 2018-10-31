import { ElectronService } from '@app/providers';
/*-----------------------------------IMPORTS---------------------------------*/
import { Component } from '@angular/core';

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor(private electornService: ElectronService) { }
  openLink(href: string) { this.electornService.openBrowserWindow(href); }
}
