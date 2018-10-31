/*-----------------------------------IMPORTS---------------------------------*/
import { Component, Input } from '@angular/core';

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'ngrx-text-input',
  templateUrl: './ngrx-text-input.component.html',
  styleUrls: ['./ngrx-text-input.component.css']
})
export class NgrxTextInputComponent {
  @Input() control;
  @Input() placeHolder;
  @Input() heading?;
  @Input() alternative?;
}
