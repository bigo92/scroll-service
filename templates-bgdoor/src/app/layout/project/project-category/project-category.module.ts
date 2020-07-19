import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCategoryComponent } from './project-category.component';
import { RouterModule } from '../../../../../node_modules/@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ProjectCategoryComponent
  ],
  declarations: [ProjectCategoryComponent]
})
export class ProjectCategoryModule { }
