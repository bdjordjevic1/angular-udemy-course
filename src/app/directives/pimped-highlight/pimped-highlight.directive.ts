import {Directive, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appPimpedHighlight]'
})
export class PimpedHighlightDirective implements OnInit {

  @Input() defaultColor = 'transparent';
  @Input() hoverColor = 'turquoise';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'green');
    this.backgroundColor = this.hoverColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
