import {ProjectDetailComponent} from './project-detail.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProjectDetailComponent },
];

export const ProjectDetailRoutes = RouterModule.forChild(routes);
