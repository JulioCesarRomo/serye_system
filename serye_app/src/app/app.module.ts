import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {AjustesAplicacion} from "./compartido/constantes/ajustes-aplicacion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./nucleo/interceptores/token.interceptor";
import {ErrorInterceptor} from "./nucleo/interceptores/error.interceptor";
import {CurrencyPipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {DirectivasModule} from "./compartido/directivas/directivas.module";
import {
  NbThemeModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbDatepickerModule,
  NbDialogModule, NbWindowModule, NbToastrModule, NbChatModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {CoreModule} from "./@core/core.module";
import {ThemeModule} from "./@theme/theme.module";

const configuracionSockets: SocketIoConfig = {
  url: AjustesAplicacion.SocketsUrl,
  options: {}
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(configuracionSockets),
    MatIconModule,
    DirectivasModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    CurrencyPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
