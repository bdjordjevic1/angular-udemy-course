import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../../shared/ingredient.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  ingredientForm: FormGroup;
  currentlyEditingSubscription: Subscription;
  currentlyEditing: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredientForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
    this.currentlyEditingSubscription = this.shoppingListService.currentlyEditing
      .subscribe(ingredient => {
        this.currentlyEditing = ingredient;
        this.ingredientForm.setValue(ingredient);
      });
  }

  ngOnDestroy() {
    this.currentlyEditingSubscription.unsubscribe();
  }

  onAddNewIngredient() {
    this.shoppingListService.addIngredient(this.ingredientForm.get('name').value, this.ingredientForm.get('amount').value);
    this.ingredientForm.reset();
  }

  onEditIngredient() {
    const name = this.ingredientForm.get('name').value;
    const amount = this.ingredientForm.get('amount').value;
    this.shoppingListService.updateIngredient(this.currentlyEditing, new Ingredient(name, amount));
    this.ingredientForm.reset();
    this.currentlyEditing = null;
  }

  onClear() {
    this.ingredientForm.reset();
    this.currentlyEditing = null;
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.currentlyEditing);
    this.ingredientForm.reset();
    this.currentlyEditing = null;
  }
}
