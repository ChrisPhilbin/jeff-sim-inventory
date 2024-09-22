import { Routes } from '@angular/router';
import { ItemDetailsComponent } from './components/item/item-details/item-details.component';
import { ItemFormComponent } from './components/item/item-form/item-form.component';
import { ItemIndexComponent } from './components/item/item-index/item-index.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { AuthComponent } from './components/auth/auth.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScheduleIndexComponent } from './components/schedule/schedule-index/schedule-index.component';

const redirectUnathorized = () => redirectUnauthorizedTo(['/auth']);

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    ...canActivate(redirectUnathorized),
  },
  {
    path: 'schedules',
    component: ScheduleIndexComponent,
    ...canActivate(redirectUnathorized),
  },
  {
    path: 'items',
    component: ItemIndexComponent,
    ...canActivate(redirectUnathorized),
  },
  {
    path: 'items/new',
    component: ItemFormComponent,
    ...canActivate(redirectUnathorized),
  },
  {
    path: 'items/:itemId',
    component: ItemDetailsComponent,
    ...canActivate(redirectUnathorized),
  },
  {
    path: 'items/:itemId/edit',
    component: ItemFormComponent,
    ...canActivate(redirectUnathorized),
  },
  {
    path: 'code',
    component: QrCodeComponent,
    ...canActivate(redirectUnathorized),
  },
  {
    path: 'code/scan',
    loadComponent: () =>
      import('./components/qr-code/qr-code-scan/qr-code-scan.component').then(
        (m) => m.QrCodeScanComponent
      ),
    ...canActivate(redirectUnathorized),
  },
  {
    path: 'code/:itemId',
    component: QrCodeComponent,
    ...canActivate(redirectUnathorized),
  },
  { path: 'auth', component: AuthComponent },
];
