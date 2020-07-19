import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent } from './news-detail.component';
import { NewsDetailRoutes } from './news-detail.routing';
import { NewsSpecialComponent } from '../news-special/news-special.component';
import { NewsSpecialModule } from '../news-special/news-special.module';
import { SafeHtmlModule } from 'src/app/_base/pipe/safe-html/safe-html.module';

@NgModule({
  imports: [
    CommonModule,
    NewsDetailRoutes,
    SafeHtmlModule,
    NewsSpecialModule
  ],
  declarations: [NewsDetailComponent]
})
export class NewsDetailModule { }
