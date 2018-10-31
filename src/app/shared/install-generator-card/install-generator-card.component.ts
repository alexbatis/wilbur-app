import { ElectronService } from '@app/providers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'install-generator-card',
  templateUrl: './install-generator-card.component.html',
  styleUrls: ['./install-generator-card.component.scss']
})
export class InstallGeneratorCardComponent implements OnInit {
  generatorGithubRepo = "https://github.com/alexbatis/generator-wilbur";

  constructor(private electronService : ElectronService) { }

  ngOnInit() {
  }

  openLink(href: string) {
    this.electronService.openBrowserWindow(href);
  }


}
