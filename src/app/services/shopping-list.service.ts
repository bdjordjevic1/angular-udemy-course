import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
  ingredientsChanged = new Subject<Ingredient[]>();
  currentlyEditing = new Subject<Ingredient>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIndexOfIngredient(ingredient: Ingredient) {
    return this.ingredients.findIndex(currIngredient => currIngredient.name === ingredient.name);
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(oldIngredient: Ingredient, newIngredient: Ingredient) {
    const index = this.getIndexOfIngredient(oldIngredient);
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeIngredient(ingredient: Ingredient) {
    this.ingredients.splice(this.getIndexOfIngredient(ingredient), 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  setCurrentlyEditing(index: number) {
    this.currentlyEditing.next(this.ingredients[index]);
  }
}
