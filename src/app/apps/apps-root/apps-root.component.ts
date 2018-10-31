/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
import { Component, OnInit, AfterViewInit } from '@angular/core';             // Angular
import { Observable } from 'rxjs';                                            // RxJS
import { Store, select } from '@ngrx/store';                                  // NgRx
import { NgxSmartModalService } from 'ngx-smart-modal';
/*--------------------CUSTOM------------------------*/
import { App } from '@app/models/App/App';
import { APPS_SELECTOR, InitializeAppFormAction, RemoveAppAction } from '@app/core/redux';
import { Router } from '@angular/router';
// declare var Tipped: any;                                                      // Tooltip library

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'app-apps-root',
  templateUrl: './apps-root.component.html',
  styleUrls: ['./apps-root.component.css']
})
export class AppsRootComponent implements AfterViewInit {
  appsState$: Observable<Array<App>>;                                    // State of defined classes

  /*--------------------CONSTRUCTOR-----------------*/
  constructor(private store: Store<any>, private router: Router, public modalService: NgxSmartModalService) {
    this.appsState$ = this.store.pipe(select(s => s[APPS_SELECTOR]));             // Get current state of classes from

  }

  /*--------------------LIFECYCLE HOOKS-------------*/
  ngAfterViewInit(): void {
    // this.createTootips(); 
  }                           // Create tooltips using Tipped after view init


  editApp(appToEdit) {
    this.store.dispatch(new InitializeAppFormAction(appToEdit));
    this.router.navigate(['apps/form/edit']);
  }

  confirmAppDelete(appToRemove) {
    const modal = this.modalService.getModal('confirmationModal');
    modal.setData({
      message: 'Are you sure you\'d like to delete this app?',
      onConfirmAction: () => {
        this.store.dispatch(new RemoveAppAction(appToRemove));
      }
    });
    modal.open();
  }

  /*--------------------FUNCTIONS-------------------*/
  /* Create tooltips on class card buttons */
  // createTootips() {
  //   Tipped.create('.fa-download', 'Download as JSON', { position: 'right', showDelay: 0 });
  //   Tipped.create('.fa-external-link', 'View App', { position: 'left', showDelay: 0 });
  //   Tipped.create('.fa-cog', 'Edit App', { position: 'bottom', showDelay: 0 });
  // }
}
