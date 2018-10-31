/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
import { Component, Input, } from '@angular/core';                            // Angular
import { Store } from '@ngrx/store';                                          // NgRx
import { NgxSmartModalService } from 'ngx-smart-modal';                       // Other
/*--------------------CUSTOM------------------------*/
import { RemoveValidationDecoratorAction } from '@app/core/redux/reducers/forms/class-form.reducer';

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'decorator-form-list',
  templateUrl: './decorator-list.component.html',
  styleUrls: ['./decorator-list.component.css']
})
export class DecoratorListFormComponent {
  /*--------------------MEMBER VARIABLES------------*/
  @Input() decorators;                                                        // All defined decorators for a member variable
  @Input() memberVariableId;                                                  // id of member variable for updating

  /*--------------------CONSTRUCTOR-----------------*/
  constructor(private store: Store<any>, public modalService: NgxSmartModalService) { }

  /*--------------------FUNCTIONS-------------------*/
  /* Opens a modal to update a decorator */
  editDecorator(decorator) {
    this.modalService.getModal('decoratorFormModal').setData({                // Inject selectred decorator & member variable id
      memberVariableId: this.memberVariableId,
      control: decorator
    });
    this.modalService.getModal('decoratorFormModal').open();                  // Open modal
  }

  /* Deletes a decorator */
  removeDecorator(decoratorId) {
    /* TODO : should this action be an EventEmitted via @Output
            - is dispatching directly from this component bad practice? */
    this.store.dispatch(new RemoveValidationDecoratorAction(this.memberVariableId, decoratorId));
  }
}
