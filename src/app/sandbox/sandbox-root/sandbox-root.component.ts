import { Component, OnInit } from '@angular/core';
import { ElectronService } from '@app/providers';
import { GeneratorService } from '@app/providers/generator/generator.service';

@Component({
  selector: 'app-sandbox-root',
  templateUrl: './sandbox-root.component.html',
  styleUrls: ['./sandbox-root.component.css']
})
export class SandboxRootComponent implements OnInit {

  constructor(private electronService : ElectronService, private generatorService : GeneratorService) { }

  ngOnInit() {

  }

  beginBoilerplateGenerator(){
    this.generatorService.beginBoilerplateGenerator();
  }

}
