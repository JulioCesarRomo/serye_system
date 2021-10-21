import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[mascaraTelefono]'
})
export class MascaraTelefonoDirective {

    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event: any) {
        this.onInputChange(event, false);
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event: any) {
        this.onInputChange(event.target.value, true);
    }

    onInputChange(event: any, backspace: any) {
        let newVal = event.replace(/\D/g, '');
        if (newVal.length === 0) {
            newVal = '';
        } else if (newVal.length <= 3) {
            newVal = newVal.replace(/^(\d{1,3})$/, '($1');
        } else if (newVal.length <= 6) {
            newVal = newVal.replace(/^(\d{1,3})(\d{1,3})$/, '($1) $2');
        } else if (newVal.length <= 10) {
            newVal = newVal.replace(/^(\d{1,3})(\d{1,3})(\d{1,4})$/, '($1) $2-$3');
        } else {
            newVal = newVal.substring(0, 10);
            newVal = newVal.replace(/^(\d{1,3})(\d{1,3})(\d{1,4})$/, '($1) $2-$3');
        }
        // @ts-ignore
        this.ngControl.valueAccessor.writeValue(newVal);
    }

}
