import { Injectable } from '@angular/core';
import { Class, App, Author } from '@app/models';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class BoilerplateService {

  private todoObject = {"id":"9c1d6603-2b43-4208-93eb-e687ef9e01dc","name":"TodoItem","description":"TypeScript class for a simple todo list item","memberVariables":[{"id":"a3a5d9b4-0787-45df-8501-641157e19f21","name":"description","type":"string","isArray":false,"decorators":[{"id":"cb92e382-15ab-4a59-b96c-fbb07c8ff0c8","name":"IsNotEmpty","params":[]},{"id":"de9cb989-91cc-4796-88a4-04ee3d5145fb","name":"IsString","params":[]}]},{"id":"4a02ac7c-d8f7-4fde-859e-8c8e50d01816","name":"completed","type":"boolean","isArray":false,"decorators":[{"id":"289a9b05-b8f8-4531-9d2a-c301c54b5884","name":"IsBoolean","params":[]}]}]};
  private todoClass: Class;
  private boilerplateApp = new App({
    appName: 'wilbur-app',
    description: 'node + express api generated by wilbur',
    generateAngularProject: false,
    author: new Author({
      name: 'Alex Batis',
      email: 'alexbatis@github.com',
      github: 'https://github.com/alexbatis'
    })
  })

  constructor(private commonService: CommonService) {
    this.todoClass = commonService.deserialize<Class>(this.todoObject, Class);
    this.boilerplateApp.classes = [this.todoClass];
  }

  getBoilerPlateApp(): App {
    return this.boilerplateApp;
  }

}