import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutes } from './contact.routing';
import { FormModule } from '../../_base/modules/form/form.module';
import { SafeModule } from '../../_base/pipe/safe/safe.module';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    SafeModule,
    ContactRoutes
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
