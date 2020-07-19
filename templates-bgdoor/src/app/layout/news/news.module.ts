import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutes } from './news.routing';
import { FormModule } from '../../_base/modules/form/form.module';
import { NewsSpecialModule } from './news-special/news-special.module';
import { NewsCategoryModule } from './news-category/news-category.module';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NewsRoutes,
    NewsSpecialModule,
    NewsCategoryModule
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
