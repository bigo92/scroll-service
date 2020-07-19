import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutes } from './layout.routing';

import { MenuModule } from '../_shared/modules/menu/menu.module';
import { FooterModule } from '../_shared/modules/footer/footer.module';
import { ShoppingCartModule } from '../_shared/modules/shopping-cart/shopping-cart.module';
import { PhoneRingModule } from '../_base/modules/phone-ring/phone-ring.module';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    FooterModule,
    ShoppingCartModule,
    PhoneRingModule,
    LayoutRoutes
  ],
  declarations: [
    LayoutComponent,
  ]
})
export class LayoutModule { }