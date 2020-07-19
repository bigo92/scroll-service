import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoutes } from './project.routing';
import { FormModule } from '../../_base/modules/form/form.module';
import { ProjectSpecModule } from './project-spec/project-spec.module';
import { ProjectCategoryModule } from './project-category/project-category.module';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    ProjectRoutes,
    ProjectSpecModule,
    ProjectCategoryModule
  ],
  declarations: [ProjectComponent]
})
export class ProjectModule { }
