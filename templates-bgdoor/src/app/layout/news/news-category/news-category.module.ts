import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCategoryComponent } from './news-category.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports :[
    NewsCategoryComponent
  ],
  declarations: [NewsCategoryComponent]
})
export class NewsCategoryModule { }
