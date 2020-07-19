import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';

const routes: Routes = [
  { path: '', component: ProductDetailComponent },
];

export const ProductDetailRoutes = RouterModule.forChild(routes);
