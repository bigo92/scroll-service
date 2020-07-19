import { Routes, RouterModule } from '@angular/router';
import { NewsDetailComponent } from './news-detail.component';

const routes: Routes = [
  { path: '', component: NewsDetailComponent },
];

export const NewsDetailRoutes = RouterModule.forChild(routes);
