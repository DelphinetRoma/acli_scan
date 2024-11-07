import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    standalone: true,
    selector: 'input[restrictTwoDecimals]'
})
export class TwoDecimalsDirective {

    @Output() valueChange = new EventEmitter();

    constructor(private elementRef: ElementRef) {
    }

    private regex: RegExp = new RegExp(/^\d*\,?\d{0,2}$/g);
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
    }
    const current: string = this.elementRef.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
        event.preventDefault();

    }
    }
}