import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent {

  @ViewChild('nameInput', {static: true})
  nameRef: ElementRef;

  @ViewChild('amountInput', {static: true})
  amountRef: ElementRef;

  @Output()
  ingredient = new EventEmitter<Ingredient>();

  onAdded() {
    this.ingredient.emit(new Ingredient(this.nameRef.nativeElement.value, this.amountRef.nativeElement.value));
  }

}
