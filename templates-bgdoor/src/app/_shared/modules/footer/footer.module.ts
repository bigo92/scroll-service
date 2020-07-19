import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FormModule } from '../../../_base/modules/form/form.module';
import { SafeModule } from '../../../_base/pipe/safe/safe.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    RouterModule,
    SafeModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [FooterComponent]
})
export class FooterModule { }