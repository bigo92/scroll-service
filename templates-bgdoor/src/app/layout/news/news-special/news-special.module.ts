import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSpecialComponent } from './news-special.component';
import { RouterModule } from '../../../../../node_modules/@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NewsSpecialComponent
  ],
  declarations: [NewsSpecialComponent]
})
export class NewsSpecialModule { }
