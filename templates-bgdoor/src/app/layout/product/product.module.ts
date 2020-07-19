import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutes } from './product.routing';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductViewModule } from '../../_shared/product-view/product-view.module';
import { FormModule } from '../../_base/modules/form/form.module';
import { FormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductCategoryModule,
    ProductViewModule,
    FormModule,
    FormsModule,
    ProductRoutes
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
