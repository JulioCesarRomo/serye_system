import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MascaraTelefonoDirective } from './mascara-telefono.directive';
import {ParticlesDirective} from "./particles.directive";

@NgModule({
  declarations: [
    MascaraTelefonoDirective,
    ParticlesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MascaraTelefonoDirective,
    ParticlesDirective
  ]
})
export class DirectivasModule {
}
