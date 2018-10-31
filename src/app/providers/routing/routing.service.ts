import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ElectronService } from '@app/providers/electron.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router, private electronService: ElectronService) {
    // $('.external-link').on('click', (event) => {
    //   console.log(event);
    // });
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        $('.content').css('background-color', '#f4f5f7');
        $('.seperator').css('background-color', '#f4f5f7');
        $('.fill-white').css({ fill: "#f4f5f7" });
      }

    });
  }
}
