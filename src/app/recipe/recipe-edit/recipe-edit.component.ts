import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../../services/recipe.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';
import {fromArray} from 'rxjs/internal/observable/fromArray';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  currentId: number;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.currentId = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  initForm() {
    let recipe: Recipe;
    if (this.editMode) {
      recipe = this.recipeService.getRecipe(this.currentId.toString());
    }

    this.recipeForm = new FormGroup({
      id: new FormControl(recipe ? recipe.id : null),
      name: new FormControl(recipe ? recipe.name : null, [Validators.required]),
      description: new FormControl(recipe ? recipe.description : null, [Validators.required]),
      imagePath: new FormControl(recipe ? recipe.imagePath : null, [Validators.required]),
      ingredients: this.getIngredients(recipe),
    });
  }

  getIngredients(recipe: Recipe): FormArray {
    if (!recipe) {
      return new FormArray([]);
    }
    const formGroups = recipe.ingredients
      .map(ingredient => {
        return  new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern('^[0-9]*$')
          ]),
        });
      });
    return new FormArray(formGroups);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray)
      .push(new FormGroup({
          name: new FormControl(null, Validators.required),
          amount: new FormControl(null, Validators.required),
        })
      );
  }

  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    this.editMode ? this.recipeService.updateRecipe(this.recipeForm.value) : this.recipeService.addRecipe(this.recipeForm.value);
  }

  onRemoveIngredient(i: number) {
    this.ingredients.splice(i, 1);
    this.recipeForm.patchValue({
      ingredients: this.ingredients
    });
  }

  onCancel() {
    this.router.navigate(['../']);
  }
}
