import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {AlertComponent} from './alert/alert.component';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import {RouterModule} from '@angular/router';
import {BasicHighlightDirective} from '../directives/basic-highlight/basic-highlight.directive';
import {PimpedHighlightDirective} from '../directives/pimped-highlight/pimped-highlight.directive';
import {UnlessDirective} from '../directives/unless-directive/UnlessDirective';
import {DropdownDirective} from '../directives/dropdown/dropdown.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    BasicHighlightDirective,
    PimpedHighlightDirective,
    UnlessDirective,
    DropdownDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    BasicHighlightDirective,
    PimpedHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule {
}
