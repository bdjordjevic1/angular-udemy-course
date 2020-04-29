import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import {ShoppingListEditComponent} from './shopping/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe/recipe-list/recipe-detail/recipe-detail.component';
import { RecipeComponent } from './recipe/recipe.component';
import {BasicHighlightDirective} from './directives/basic-highlight/basic-highlight.directive';
import { PimpedHighlightDirective } from './directives/pimped-highlight/pimped-highlight.directive';
import {UnlessDirective} from './directives/unless-directive/UnlessDirective';
import {DropdownDirective} from './directives/dropdown/dropdown.directive';
import {AppRoutingModule} from './app-routing.module';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeComponent,
    BasicHighlightDirective,
    PimpedHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
