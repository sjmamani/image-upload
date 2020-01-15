import { Routes, RouterModule } from '@angular/router';
import { PhotoComponent } from './components/photo/photo.component';
import { UploadComponent } from './components/upload/upload.component';

const ROUTES: Routes = [
  {
    path: 'photos',
    component: PhotoComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'photos'
  }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
