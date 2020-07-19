import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { TextMaskModule } from '../../../../node_modules/angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TextMaskModule
  ],
  exports:[
    ProductViewComponent
  ],
  declarations: [ProductViewComponent]
})
export class ProductViewModule { }
