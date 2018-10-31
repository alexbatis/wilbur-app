/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  ViewChild,
  ElementRef,
  ViewChildren,
  EventEmitter,
  Output
} from '@angular/core';
// Other
import { v4 as uuid } from 'uuid';
declare var $: any;

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'ngrx-select-input',
  templateUrl: './ngrx-select-input.component.html',
  styleUrls: ['./ngrx-select-input.component.css']
})
export class NgrxSelectInputComponent implements AfterViewInit, OnChanges {
  /*--------------------MEMBER VARIABLES------------*/
  @Input() control;                                                           // Form control
  @Input() placeHolder;                                                       // Placeholder text for form control
  @Input() options;                                                           // Form control options
  @Input() heading?;                                                          // Heading text for form
  @Input() alternative?;                                                      // Use of alternative form theme
  @Input() liveSearch?;                                                       // Live search option for bootstrap-select
  @Output('valueChange') valueChange = new EventEmitter<any>();               // Value change event
  // @ViewChild('fixedBox') fixedBox: ElementRef;                             // View element for tracking position of bootstrap-select
  uniqueContainer = uuid();                                                   // ID of container for tracking position of bootstrap-select

  /*--------------------LIFECYCLE HOOKS-------------*/
  /*  */
  ngAfterViewInit() {
    this.updateBorderColor(this.control);
    // Next lines for adjusting height of bootstrap-select
    // this.adjustHeight();
    // $('.dropdown-toggle').click(() => {
    //   this.adjustHeight();
    // });
  }
  /* Updates border color when control value is changed */
  ngOnChanges(changes) {
    if (changes.control.currentValue)
      this.updateBorderColor(changes.control.currentValue);
  }

  /*--------------------FUNCTIONS-------------------*/
  /* Emits event with selected option when value is changed */
  onSelectionChange(event) {
    // const x = event.target.selectedOptions[0].text;
    this.valueChange.emit(event.value);
  }

  /* Adjustment for height for bootstrap-select positioning */
  adjustHeight() {
    const containerSelector = `#select-container-${this.uniqueContainer}`;
    const formSelector = `#select-form-${this.uniqueContainer}`;
    const dropDownHeight = $('.dropdown-menu.show').height();
    const windowFormOffset = $(formSelector).offset().top - $(window).scrollTop();
    const formHeight = $(formSelector).height();
    const scrollTop = $(window).scrollTop();
    $(containerSelector).offset({ top: windowFormOffset + scrollTop + dropDownHeight + formHeight });
  }

  /*  Updates color of select border based on form control value */
  private updateBorderColor(control) {
    let borderColor = '#cad1d7';
    if (control.isValid && !control.isPristine)
      borderColor = '#2dce89';
    else if (!control.isValid && !control.isPristine)
      borderColor = '#fde6e8';

    if (borderColor === '#fde6e8')
      $(`#select-${this.uniqueContainer}`).css('box-shadow', `inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px ${borderColor}`);
  }
}
