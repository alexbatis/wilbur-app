/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
// NgRx
import { Store } from '@ngrx/store';
// Other
import { NgxSmartModalService } from 'ngx-smart-modal';

export interface ConfirmationModalData {
  message: string;
  onConfirmAction: Function;
}


/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  /*--------------------MEMBER VARIABLES------------*/
  data: ConfirmationModalData = {
    message: 'Are you sure you want to do this?',
    onConfirmAction: () => {
      this.modalService.getModal('confirmationModal').removeData();
      this.modalService.getModal('confirmationModal').close();
    }
  }

  /*--------------------CONSTRUCTOR-----------------*/
  constructor(private store: Store<any>, public modalService: NgxSmartModalService) { }

  /*--------------------FUNCTIONS-------------------*/
  /* Process incoming data when another component injects data to this modal instance */
  dataAdded() {
    this.data = this.modalService.getModal('confirmationModal').getData();   // scope incoming data
  }

  confirm() {
    this.data.onConfirmAction();
    this.modalService.getModal('confirmationModal').close();
  }

  /* Purge injected data when modal is closed or dismissed  */
  onAnyClose() {
    // TODO : will un-scoping vars to remove *ngIf checks?
    this.modalService.getModal('confirmationModal').removeData();
  }

}
