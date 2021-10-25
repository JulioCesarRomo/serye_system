import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MascaraTelefonoDirective } from './mascara-telefono.directive';
import {ParticlesDirective} from "./particles.directive";
import {ValidadorExisteDirective} from "./validador-existe.directive";

@NgModule({
  declarations: [
    MascaraTelefonoDirective,
    ParticlesDirective,
    ValidadorExisteDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MascaraTelefonoDirective,
    ParticlesDirective,
    ValidadorExisteDirective
  ]
})
export class DirectivasModule {
}
