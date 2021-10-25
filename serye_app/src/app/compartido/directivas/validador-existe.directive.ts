import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
    selector: '[existe]',
    providers: [{provide: NG_VALIDATORS, useExisting: ValidadorExisteDirective, multi: true}]
  })
  export class ValidadorExisteDirective implements Validator {
    @Input('existe') existe: BehaviorSubject<boolean>;
  
    validate(control: AbstractControl): {[key: string]: any} | null {
      return this.existe.value ? {'existe': {value: true}} : null;
    }
  }