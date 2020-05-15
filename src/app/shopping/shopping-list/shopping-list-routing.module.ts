import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list.component';

const routes: Routes = [
  {path: '', component: ShoppingListComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ShoppingListRoutingModule {

}
