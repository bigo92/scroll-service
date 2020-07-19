import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSpecComponent } from './project-spec.component';
import { RouterModule } from '../../../../../node_modules/@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ProjectSpecComponent
  ],
  declarations: [ProjectSpecComponent]
})
export class ProjectSpecModule { }
