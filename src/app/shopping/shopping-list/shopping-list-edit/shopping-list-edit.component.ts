import {Component, ElementRef, ViewChild} from '@angular/core';
import {ShoppingListService} from '../../../services/shopping-list.service';

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

  constructor(private shoppingListService: ShoppingListService) {
  }

  onAdded() {
    this.shoppingListService.addIngredient(this.nameRef.nativeElement.value, this.amountRef.nativeElement.value);
  }

}
