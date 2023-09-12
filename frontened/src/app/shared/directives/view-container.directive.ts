import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[componentHost]',
})
export class ViewContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}