import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../../services/recipe.service';
import {ShoppingListService} from '../../../services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.recipeService.selectedRecipe.subscribe(selectedRecipe => {
      this.recipe = selectedRecipe;
    });
  }

  onAddToShoppingList() {
    this.shoppingListService.addToShoppingList(this.recipe.ingredients);
  }

}
