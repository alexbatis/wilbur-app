/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
import { Component, OnInit, AfterViewInit } from '@angular/core';             // Angular
import { Observable } from 'rxjs';                                            // RxJS
import { Store, select } from '@ngrx/store';                                  // NgRx
import { NgxSmartModalService } from 'ngx-smart-modal';

/*--------------------CUSTOM------------------------*/
import { Class } from '@app/models/Class/Class';
import { InitializeClassFormAction, RemoveClassAction } from '@app/core/redux';
import { Router } from '@angular/router';
// declare var Tipped: any;                                                      // Tooltip library

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'app-classes-root',
  templateUrl: './classes-root.component.html',
  styleUrls: ['./classes-root.component.css']
})
export class ClassesRootComponent implements AfterViewInit {
  classesState$: Observable<Array<Class>>;                                    // State of defined classes

  /*--------------------CONSTRUCTOR-----------------*/
  constructor(private store: Store<any>, private router: Router, public modalService: NgxSmartModalService) {
    this.classesState$ = this.store.pipe(select(s => s.classes));             // Get current state of classes from
  }

  /*--------------------LIFECYCLE HOOKS-------------*/
  ngAfterViewInit(): void {
    // this.createTootips(); 
  }                           // Create tooltips using Tipped after view init

  editClass(classToEdit) {
    this.store.dispatch(new InitializeClassFormAction(classToEdit));
    this.router.navigate(['classes/form/edit']);
  }

  confirmClassDelete(classToRemove) {
    const modal = this.modalService.getModal('confirmationModal');
    modal.setData({
      message: 'Are you sure you\'d like to delete this class?',
      onConfirmAction: () => {
        this.store.dispatch(new RemoveClassAction(classToRemove));
      }
    });
    modal.open();
  }

  /*--------------------FUNCTIONS-------------------*/
  /* Create tooltips on class card buttons */
  // createTootips() {
  //   Tipped.create('.fa-download', 'Download as JSON', { position: 'right', showDelay: 0 });
  //   Tipped.create('.fa-external-link', 'View Class', { position: 'left', showDelay: 0 });
  //   Tipped.create('.fa-cog', 'Edit Class', { position: 'bottom', showDelay: 0 });
  // }
}
