import { Routes } from '@angular/router';
import { ItemDetailsComponent } from './components/item/item-details/item-details.component';
import { ItemFormComponent } from './components/item/item-form/item-form.component';
import { ItemIndexComponent } from './components/item/item-index/item-index.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { QrCodeScanComponent } from './components/qr-code/qr-code-scan/qr-code-scan.component';

export const routes: Routes = [
  { path: '', component: ItemIndexComponent, pathMatch: 'full' },
  { path: 'items/new', component: ItemFormComponent },
  { path: 'items/:itemId', component: ItemDetailsComponent },
  { path: 'items/:itemId/edit', component: ItemFormComponent },
  { path: 'code', component: QrCodeComponent },
  { path: 'code/scan', component: QrCodeScanComponent },
  { path: 'code/:itemId', component: QrCodeComponent },
];
