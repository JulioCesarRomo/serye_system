import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import {LoginComponent} from './login.component';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {DirectivasModule} from "../../directivas/directivas.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        OverlayModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        DirectivasModule,
        NgxSpinnerModule,
        FlexModule
    ],
  bootstrap:    [ LoginComponent ]
})
export class LoginModule {

}
