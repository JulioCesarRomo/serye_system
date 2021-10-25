import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {NB_WINDOW, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import {filter, map, takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import {LayoutService} from "../../../@core/utils";
import {AutenticacionService} from "../../../nucleo/servicios/autenticacion.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SpinnerCargaCirculos} from "../../../compartido/constantes/globales";
import {WebSocketsService} from "../../../nucleo/servicios/web-sockets.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertasService} from "../../../nucleo/servicios/alertas.service";
import {TemasInterfaz} from "../../../compartido/enumeraciones/temas-interfaz.enum";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  temas = [
    {
      id: TemasInterfaz.Claro,
      value: 'default',
      name: 'Claro',
    },
    {
      id: TemasInterfaz.Corporativo,
      value: 'corporate',
      name: 'Corporativo',
    },
    {
      id: TemasInterfaz.Cosmico,
      value: 'cosmic',
      name: 'Cosmico',
    },
    {
      id: TemasInterfaz.Oscuro,
      value: 'dark',
      name: 'Oscuro',
    },

  ];

  temaActual = 'default';

  menuItems = [ { title: 'Perfil' }, { title: 'Cerrar sesión' } ];

  constructor(
      private router: Router,
      private _serAlertas: AlertasService,
      private _serSpinner: NgxSpinnerService,
      private _serWebSockets: WebSocketsService,
      private sidebarService: NbSidebarService,
      private nbMenuService: NbMenuService,
      private themeService: NbThemeService,
      private userService: UserData,
      private layoutService: LayoutService,
      private breakpointService: NbMediaBreakpointsService,
      private _serAutenticacion: AutenticacionService,
      @Inject(NB_WINDOW) private window
  ) {
  }

  ngOnInit() {
    this.nbMenuService.onItemClick()
        .pipe(
            filter(({ tag }) => tag === 'my-context-menu'),
            map(({ item: { title } }) => title),
        )
        .subscribe(title => {
          if(title == 'Perfil') console.log('Perfil')
          else this.cerrarSesion();
        });
    this.temaActual = this.themeService.currentTheme;
    this.user.name = this._serAutenticacion.obtenerNombreDeUsuario();
    /*this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);*/
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.temaActual = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.nbMenuService.navigateHome();
    return false;
  }
  cerrarSesion() {
    this._serSpinner.show(undefined, SpinnerCargaCirculos)
    this._serAutenticacion.cerrarSesionUsuario().subscribe(
        (resp) => {
          this._serWebSockets.cerrarSesionWS().then(
              () => {
                localStorage.removeItem('tema-actual');
                this.router.navigate(['/login']);
                this._serSpinner.hide();
                this._serAutenticacion.destruirToken();
              })
        },
        (err: HttpErrorResponse) => {
          this._serSpinner.hide();
          this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
        }
    )
  }
}
