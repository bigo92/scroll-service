import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailRoutes } from './product-detail.routing';
import { ProductViewModule } from '../../../_shared/product-view/product-view.module';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,    
    ProductViewModule,
    TextMaskModule,
    ProductDetailRoutes
  ],
  declarations: [ProductDetailComponent]
})
export class ProductDetailModule { }
