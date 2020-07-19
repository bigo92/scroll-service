import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { RouterModule } from '../../../../../node_modules/@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ProductCategoryComponent
  ],
  declarations: [ProductCategoryComponent]
})
export class ProductCategoryModule { }
