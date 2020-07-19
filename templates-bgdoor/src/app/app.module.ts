import { AppRoutes } from './app.routing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';


import { ModalModule } from 'ngx-bootstrap';
import { PostService } from './_shared/services/post.service';
import { BannerService } from './_shared/services/banner.service';
import { FormModule } from './_base/modules/form/form.module';
import { HistoryService } from './_base/services/history.service';
import { PhotoService } from './_shared/services/photo.service';
import { PhotoCategoryService } from './_shared/services/photo-category.service';
import { SettingService } from './_shared/services/setting.service';
import { GlobalDataService } from './_shared/services/global-data.service';
import { ProductCategoryService } from 'src/app/_shared/services/productCategory.service';
import { ProductService } from './_shared/services/product.service';
import { CheckOutService } from './_shared/services/check-out.service';
import { GioHangService } from './_shared/services/gio-hang.service';
import { HttpService } from 'src/app/_base/services/http.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { LanguageService } from 'src/app/_base/services/language.service';
import { PostCategoryService } from './_shared/services/postCategory.service';
import { ScrollService } from './_base/services/scroll.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    AppRoutes
  ],
  providers: [
    SettingService,
    PhotoCategoryService,
    PhotoService,
    TranslateService,
    PostService,
    BannerService,
    ProductCategoryService,
    ProductService,
    GlobalDataService,
    CheckOutService,
    GioHangService,
    PostCategoryService
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
