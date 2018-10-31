/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
// RxJS
import { take } from 'rxjs/operators';
// NgRx
import { Store, select } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
// Other
import { NgxSmartModalService } from 'ngx-smart-modal';
/*--------------------CUSTOM------------------------*/
import { RemoveMemberVariableAction, AddValidationDecoratorAction, CLASS_FORM_SELECTOR } from '@redux/reducers/forms/class-form.reducer';
import { Class, MemberVariableDecorator } from '@app/models';

// Interface to describe the form control to avoid implicit any type rrors
interface IMemberVariableControl {
  controls: {
    name: { value: string; };
    type : any;
    isArray : any;
    decorators: any;
  };
  value: { id: string };
}

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'member-variable-form-card',
  templateUrl: './member-variable-form-card.component.html',
  styleUrls: ['./member-variable-form-card.component.css']
})
export class MemberVariableFormCardComponent implements OnInit, OnChanges {
  /*--------------------MEMBER VARIABLES------------*/
  @Input() memberVariable: IMemberVariableControl;                            // Member variable to create form for
  nameHeading = 'Member variable name';                                       // Form heading placeholder, changes when a member variable name is present
  typeOptions = [                                                             // Primitive types that can be selected
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'object', label: 'Object' }
  ];

  /*--------------------CONSTRUCTOR-----------------*/
  constructor(private store: Store<any>, public modalService: NgxSmartModalService) {
    this.store                                                                // Get all defined classes from store
      .pipe(take(1), select(s => s.classes))
      .subscribe((classes: Array<Class>) => {
        classes.forEach(tsClass => {
          this.typeOptions.push({                                             // Add classes to the available options for member variable type
            value: tsClass.name,
            label: tsClass.name
          });
        });
      });
  }

  /*--------------------LIFECYCLE HOOKS-------------*/
  ngOnInit() {
    this.nameHeading = this.memberVariable.controls.name.value || 'Member variable name';                       // Configure heading based on name of member variable
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.memberVariable.currentValue) return;
    this.nameHeading = changes.memberVariable.currentValue.controls.name.value || 'Member variable name';       // Configure heading based on name of member variable
  }

  /*--------------------FUNCTIONS-------------------*/
  deleteMemberVariable() {
    this.store.dispatch(new RemoveMemberVariableAction(this.memberVariable.value.id));
  }

  createNewDecorator() {
    const decoratorToAdd = new MemberVariableDecorator();                                                       // Create empty decorator here so we can later reference it by id
    this.store.dispatch(new AddValidationDecoratorAction(this.memberVariable.value.id, decoratorToAdd));        // Add empty decorator

    this.store
      .pipe(select(s => s[CLASS_FORM_SELECTOR]), take(1))
      .subscribe((state: FormGroupState<Class>) => {
        const memberVariableToRetreiveDecorator = state.controls.memberVariables.controls
          .find(classVar => classVar.value.id === this.memberVariable.value.id);                                // Get form control for the member variable
        const indexToRetreiveDecorator = memberVariableToRetreiveDecorator.controls.decorators.controls
          .findIndex(decorator => decorator.value.id === decoratorToAdd.id);                                    // Get form control for the decorator we just created

        this.modalService
          .getModal('decoratorFormModal')
          .setData({
            memberVariableId: this.memberVariable.value.id,
            control: memberVariableToRetreiveDecorator.controls.decorators.controls[indexToRetreiveDecorator]   // Inject decorator form control to modal
          });

        this.modalService.getModal('decoratorFormModal').open();                                                // Open modal to configure the new dcorator
      });

  }


}
