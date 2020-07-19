import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children:[
    { path: '', loadChildren: './home/home.module#HomeModule'},
    
    { path: 'du-an', loadChildren: './project/project.module#ProjectModule'},
    { path: 'du-an/:keyName', loadChildren: './project/project.module#ProjectModule'},   
    { path: 'du-an/:keyName/:id', loadChildren: './project/project-detail/project-detail.module#ProjectDetailModule'},   

    { path: 'tin-tuc', loadChildren: './news/news.module#NewsModule'},
    { path: 'tin-tuc/:keyName', loadChildren: './news/news.module#NewsModule'},

    { path: 'tin-tuc/:keyName/:id', loadChildren: './news/news-detail/news-detail.module#NewsDetailModule'},
    { path: 'page/:keyName/:id', loadChildren: './news/news-detail/news-detail.module#NewsDetailModule'},

    { path: 'lien-he', loadChildren: './contact/contact.module#ContactModule'},
    { path: 'gioi-thieu', loadChildren: './about/about.module#AboutModule'},

    { path: 'san-pham', loadChildren: './product/product.module#ProductModule'},
    { path: 'san-pham/:keyName', loadChildren: './product/product.module#ProductModule'},
    { path: 'san-pham/tim-kiem', loadChildren: './product/product.module#ProductModule'},
    { path: 'san-pham/:keyName/:id', loadChildren: './product/product-detail/product-detail.module#ProductDetailModule'},

    { path: 'dat-hang', loadChildren: './check-out/check-out.module#CheckOutModule'},

  ]},
];

export const LayoutRoutes = RouterModule.forChild(routes);
