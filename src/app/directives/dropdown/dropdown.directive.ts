import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  // openDropdown = false;
  //
  // constructor(private elementRef: ElementRef, private render: Renderer2) {
  // }
  //
  // @HostListener('click') changeDropdown() {
  //   if (this.openDropdown) {
  //     this.render.removeClass(this.elementRef.nativeElement, 'open');
  //   } else {
  //     this.render.addClass(this.elementRef.nativeElement, 'open');
  //   }
  //   this.openDropdown = !this.openDropdown;
  // }

  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}
