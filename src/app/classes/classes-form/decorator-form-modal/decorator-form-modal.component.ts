/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
// RxJS
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
// NgRx
import { Store, select } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
// Other
import { NgxSmartModalService } from 'ngx-smart-modal';
/*--------------------CUSTOM------------------------*/
import { CommonService } from '@app/providers';
import { MemberVariableDecoratorParam, Class } from '@app/models';
import { UpdateValidationDecoratorAction } from '@app/core/redux/reducers/forms/class-form.reducer';

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'decorator-form-modal',
  templateUrl: './decorator-form-modal.component.html',
  styleUrls: ['./decorator-form-modal.component.css']
})
export class DecoratorFormModalComponent implements OnInit, OnDestroy {
  /*--------------------MEMBER VARIABLES------------*/
  availableDecorators = [];                                                   // list of decorators to be used as select options
  allDecorators = [];                                                         // list of all class-validator decorators
  currentClassFormState$: Observable<FormGroupState<Class>>;                  // up to date copy of current class form state
  classFormState$: Observable<FormGroupState<Class>>;                         // class form state (only updated on modal data add)
  memberVariableFormIndex = -1;                                               // index of current member variable form
  memberVariableDecoratorIndex = -1;                                          // index of current member variable decorator
  memberVariableId = '';                                                      // id of current member variable
  decoratorId = '';                                                           // id of current decorator
  decoratorFormId = '';                                                       // form id of current decorator (for updating)
  data;                                                                       // data passed in to modal
  control;                                                                    // decorator form control
  private unsubscribe$: Subject<void> = new Subject<void>();                  // unsubscribe subject for canceling subscriptions on component destroy


  /*--------------------CONSTRUCTOR-----------------*/
  constructor(
    private store: Store<any>,
    public modalService: NgxSmartModalService,
    private commonService: CommonService) {
    this.currentClassFormState$ = this.store.pipe(select(s => s.classForm));  // select class form state (up to date)
    this.currentClassFormState$.pipe(takeUntil(this.unsubscribe$));           // subscribe to class form state until component destroy
  }

  /*--------------------LIFECYCLE HOOKS-------------*/
  ngOnInit() {
    this.allDecorators = this.commonService.getAvailableDecorators();  // grab all class-validator decorators
    this.allDecorators.forEach(decorator => {                                 // construct options for decorator name select input
      this.availableDecorators.push({
        value: decorator.name,
        label: decorator.name
      });
    });
  }

  /* Cancel subscriptions on component destroy */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /*--------------------FUNCTIONS-------------------*/
  /* Process incoming data when another component injects data to this modal instance */
  dataAdded() {
    this.data = this.modalService.getModal('decoratorFormModal').getData();   // scope incoming data
    this.control = this.data.control;                                         // scope injected form control
    if (!this.data || typeof this.data === 'undefined') return;               // return if incoming data is empty
    this.classFormState$ = this.store.pipe(select(s => s.classForm));         // select class form state (updated on data injection)
    this.classFormState$.pipe(take(1)).subscribe(formState => {               // get current state of class form
      /* iterate over the form state member variables and decorators to find the
         index of the injected decorator.  the index is needed to directly manipulate
         the class form state obserable. if 'this.control' is used, data will become stale */
      for (let i = 0; i < formState.value.memberVariables.length; i++) {
        const decorators = formState.value.memberVariables[i].decorators;
        for (let j = 0; j < decorators.length; j++) {
          if (decorators[j].id === this.data.control.value.id) {
            // decorator found, scope indicies & id's for manipulating the class form state
            this.memberVariableFormIndex = i;
            this.memberVariableDecoratorIndex = j;
            this.memberVariableId = formState.controls.memberVariables.controls[i].value.id;
            this.decoratorId = formState.controls.memberVariables.controls[i].controls.decorators.controls[j].value.id;
            this.decoratorFormId = formState.controls.memberVariables.controls[i].controls.decorators.controls[j].id;
          }
        }
      }
    });
  }

  /* Purge injected data when modal is closed or dismissed  */
  onAnyClose() {
    // TODO : will un-scoping vars to remove *ngIf checks?
    this.modalService.getModal('decoratorFormModal').removeData();
  }

  /* Update parameters of decorator when its name is changed */
  updateDecoratorParams(newDecoratorValue) {
    const decoratorParams = this.allDecorators.find(                          // find decorator params for selected name
      dec => dec.name === newDecoratorValue
    ).params;

    const newParams = new Array<MemberVariableDecoratorParam>();              // create placeholder for params
    for (let i = 0; i < decoratorParams.length; i++) {                        // serialize params
      newParams.push(
        new MemberVariableDecoratorParam({
          name: decoratorParams[i].name,
          value: decoratorParams[i].value,
          type: decoratorParams[i].type
        })
      );
    }

    this.store.dispatch(                                                      // update form state with new params
      new UpdateValidationDecoratorAction(
        this.data.memberVariableId,
        this.data.control.value.id,
        newParams,
        this.data.control.id
      )
    );
  }

  /* Corrects onblur errors for *ngFor interation on form controls */
  trackByIndex(index: number) { return index; }

}
