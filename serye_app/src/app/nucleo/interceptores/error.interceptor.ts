import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { WebSocketsService } from '../servicios/web-sockets.service';
import { Router } from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private _serAutenticacion: AutenticacionService,
        private _serWebSockets: WebSocketsService,
        private _serSpinner: NgxSpinnerService,
        private enrutador: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
              /*this._serWebSockets.cerrarSesionWS().then(
                () => {*/
                  localStorage.removeItem('tema-actual');
                  this.enrutador.navigate(['/login']);
                  this._serSpinner.hide();
                  this._serAutenticacion.destruirToken();
                /*})*/
            }
            return throwError(err);
        }));
    }
}
