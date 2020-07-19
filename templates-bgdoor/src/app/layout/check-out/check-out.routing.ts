import { Routes, RouterModule } from '@angular/router';
import { CheckOutComponent } from './check-out.component';

const routes: Routes = [
  { path: '', component: CheckOutComponent },
];

export const CheckOutRoutes = RouterModule.forChild(routes);
