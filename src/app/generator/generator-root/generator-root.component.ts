import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-generator-root',
  templateUrl: './generator-root.component.html',
  styleUrls: ['./generator-root.component.scss']
})
export class GeneratorRootComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    // $('.content').css('background-color', '#f4f5f7');
    // $('.seperator').css('background-color', '#f4f5f7');
    // $('.fill-white').css({ fill: "#f4f5f7" });
  }

  ngOnDestroy() {
    // $('.content').css('background-color', 'white');
    // $('.seperator').css('background-color', 'white');
    // $('.fill-white').css({ fill: "#white" });
  }


}
