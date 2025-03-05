import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { OverviewComponent } from './components/overview/overview.component';
import { EditTechnologyComponent } from './components/edit-technology/edit-technology.component';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'create-technology',
    component: TechnologyComponent,
    canActivate: [adminGuard],
  },
  { path: 'overview', component: OverviewComponent, canActivate: [userGuard] },
  {
    path: 'edit-technology/:id',
    component: EditTechnologyComponent,
    canActivate: [adminGuard],
  },
];
