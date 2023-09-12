import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { PrivateLayoutComponent } from './core/components/private-layout/private-layout.component';
import { environment } from '@environments/environment';
import { FailedComponent } from './failed/failed.component';

const mode = environment.mode;

const adminRoutes = [
  {
    path: 'form-builder',
    component: PrivateLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/form-builder/form-builder.module').then(
            (m) => m.FormBuilderModule
          ),
        canActivate:[MsalGuard]
      },
    ],
  },
  {
    path: 'form-renderer',
    component: PrivateLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/form-renderer/form-renderer.module').then(
            (m) => m.FormRendererModule
          ),
        canActivate:[MsalGuard]
      },
    ],
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate:[MsalGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  {
    path: 'login-failed', component: FailedComponent
  },
  { path: '**', component: PageNotFoundComponent },
];

const customerRoutes = [
  {
    path: 'form-renderer',
    component: PrivateLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/form-renderer/form-renderer.module').then(
            (m) => m.FormRendererModule
          ),
        canActivate: [MsalGuard]
      },
    ],
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/form-renderer/form-renderer.module').then(
            (m) => m.FormRendererModule
          ),
        canActivate: [MsalGuard]
      },
    ],
  },
  {
    path: 'login-failed', component: FailedComponent
  },
  { path: '**', component: PageNotFoundComponent },
];

const routes: Routes = (environment.mode === 'ADMIN') ? adminRoutes
  : (environment.mode === 'CUSTOMER') ? customerRoutes
    : []

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}