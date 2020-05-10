import {Injectable} from '@angular/core';
import {RecipeService} from '../recipe/recipe.service';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipe/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private recipeService: RecipeService,
              private http: HttpClient,) {
  }

  saveData() {
    this.http
      .put('https://angular-udemy-course-1911.firebaseio.com/recipes.json', this.recipeService.getRecipes())
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchData() {
    return this.http
      .get<Recipe[]>('https://angular-udemy-course-1911.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
