import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[] = [
    new Recipe('A test recipe', 'Simply a test decription', 'https://food.fnr.sndimg.com/content/dam/images/' +
      'food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg'),
    new Recipe('Second test recipe', 'My super cool description', 'https://food.fnr.sndimg.com/content/dam/images/' +
      'food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg')
  ];
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }

}
