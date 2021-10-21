import { Component, OnInit } from '@angular/core';

import {MENU_ITEMS} from "../../constantes/menu-items";

@Component({
  selector: 'app-inicio',
  styleUrls: ['./inicio.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class InicioComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
