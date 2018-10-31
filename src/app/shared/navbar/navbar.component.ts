/*-----------------------------------IMPORTS---------------------------------*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/*-----------------------------------COMPONENT-------------------------------*/
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  /*--------------------CONSTRUCTOR-----------------*/
  constructor(private router: Router) { }

  /*--------------------FUNCTIONS-------------------*/
  /* Toggles visibility of nav bar when navgation occurs */
  toggleNavbar(route: string) {
    this.router.navigate([route]);
    document.getElementById('navbar-toggler').click();
  }
}
