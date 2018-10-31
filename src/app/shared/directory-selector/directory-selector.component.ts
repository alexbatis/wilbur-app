import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '@app/providers/generator/generator.service';

@Component({
  selector: 'app-directory-selector',
  templateUrl: './directory-selector.component.html',
  styleUrls: ['./directory-selector.component.scss']
})
export class DirectorySelectorComponent implements OnInit {

  constructor(private generatorService: GeneratorService) { }

  ngOnInit() {
  }


  openDirectoryChooser() {
    this.generatorService.openDirectoryChooser();
  }

}
