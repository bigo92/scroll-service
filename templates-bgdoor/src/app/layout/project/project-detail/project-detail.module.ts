import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectDetailRoutes } from './project-detail.routing';
import { ProjectSpecModule } from '../project-spec/project-spec.module';
import { ProductCategoryModule } from '../../product/product-category/product-category.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectSpecModule,
    ProjectDetailRoutes,
  ],
  declarations: [ProjectDetailComponent]
})
export class ProjectDetailModule { }
