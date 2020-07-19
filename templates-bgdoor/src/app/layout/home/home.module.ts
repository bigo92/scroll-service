import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';
import { FormModule } from '../../_base/modules/form/form.module';
import { ImgServerModule } from '../../_base/modules/img-server/img-server.module';
import { TruncateModule } from 'ng2-truncate';
import { S1Component } from './s1/s1.component';
import { S2Component } from './s2/s2.component';
import { S3Component } from './s3/s3.component';
import { S4Component } from './s4/s4.component';
import { S5Component } from './s5/s5.component';
import { S6Component } from './s6/s6.component';
import { ProductViewModule } from '../../_shared/product-view/product-view.module';

@NgModule({
    imports: [
        CommonModule,
        TruncateModule,
        ProductViewModule,
        HomeRoutes
    ],
    declarations: [
        HomeComponent,
        S1Component,
        S2Component,
        S3Component,
        S4Component,
        S5Component,
        S6Component
    ]
})
export class HomeModule { }