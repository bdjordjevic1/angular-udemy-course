import {Injectable} from '@angular/core';
import {Recipe} from '../recipe/recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('1',
      'A test recipe',
      'Simply a test decription',
      'https://food.fnr.sndimg.com/content/dam/images/' +
      'food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
      [new Ingredient('Avocado', 5), new Ingredient('Mango', 2)]),
    new Recipe('2',
      'Second test recipe',
      'My super cool description',
      'https://www.bbcgoodfood.com/sites/default/files/'
      + 'recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
      [new Ingredient('Beans', 200), new Ingredient('Olives', 15)])
  ];
  currentRecipes = new Subject<Recipe[]>();

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: string) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Recipe) {
    const lastId = +this.recipes[this.recipes.length - 1].id;
    recipe.id = (lastId + 1).toString();
    this.recipes.push(recipe);
    console.log(this.recipes);
    this.currentRecipes.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe) {
    const index = this.recipes.findIndex(currentRecipe => currentRecipe.id === recipe.id);
    console.log(index);
    this.recipes[index] = recipe;
    console.log('updating recipe...');
    console.log(this.recipes);
    this.currentRecipes.next(this.recipes.slice());
  }

  deleteRecipe(id: string) {
    const index = this.recipes.findIndex(currentRecipe => currentRecipe.id === id);
    this.recipes.splice(index, 1);
    this.currentRecipes.next(this.recipes.slice());
  }
}
