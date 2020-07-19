import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './check-out.component';
import { CheckOutRoutes } from './check-out.routing';
import { FormModule } from '../../_base/modules/form/form.module';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    CheckOutRoutes
  ],
  declarations: [CheckOutComponent]
})
export class CheckOutModule { }
