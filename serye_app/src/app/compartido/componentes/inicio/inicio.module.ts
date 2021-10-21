import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import {MatIconModule} from "@angular/material/icon";
import {NbButtonModule, NbLayoutModule, NbMenuModule, NbSidebarModule} from "@nebular/theme";
import {FooterComponent} from "../footer/footer.component";
import {ThemeModule} from "../../../@theme/theme.module";

@NgModule({
  declarations: [
    InicioComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    OverlayModule,
    MatIconModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
    ThemeModule,
  ],
})
export class InicioModule {
 
}
