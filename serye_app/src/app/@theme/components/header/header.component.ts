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
import {TEMAS_INTERFAZ} from "../../../../../../serye_server/src/api/constantes/temas-interfaz.constant";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  temas = TEMAS_INTERFAZ;

  temaActual = 'default';

  menuItems = [ { title: 'Perfil' }, { title: 'Cerrar sesión' } ];

  constructor(
      private router: Router,
      private userService: UserData,
      private _serAlertas: AlertasService,
      private nbMenuService: NbMenuService,
      private themeService: NbThemeService,
      private layoutService: LayoutService,
      private _serSpinner: NgxSpinnerService,
      private sidebarService: NbSidebarService,
      private _serWebSockets: WebSocketsService,
      public _serAutenticacion: AutenticacionService,
      private breakpointService: NbMediaBreakpointsService,
      @Inject(NB_WINDOW) private window
  ) {
  }

  ngOnInit() {
    this.nbMenuService.onItemClick()
        .pipe(
            filter(({ tag }) => tag === 'menu_perfil_usuario'),
            map(({ item: { title } }) => title),
        )
        .subscribe(title => {
          if(title == 'Perfil') console.log('Perfil')
          else this.cerrarSesion();
        });
    this.themeService.changeTheme(this._serAutenticacion.obtenerNombreTemaInterfaz());
    this.temaActual = this._serAutenticacion.obtenerNombreTemaInterfaz()
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
    /*this.cambiarTemaInterfaz(this._serAutenticacion.obtenerNombreTemaInterfaz())*/
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cambiarTemaInterfaz(nombreDelTema: string) {
    this.themeService.changeTheme(nombreDelTema);
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
          /*this._serWebSockets.cerrarSesionWS().then(
              () => {*/
                localStorage.removeItem('token_aut');
                localStorage.removeItem('id_tema_interfaz');
                this.router.navigate(['/login']);
                this._serSpinner.hide();
                this._serAutenticacion.destruirToken();
              /*})*/
        },
        (err: HttpErrorResponse) => {
          this._serSpinner.hide();
          this._serAlertas.error(err.error.titulo, err.error.detalles, 3000);
        }
    )
  }
}
