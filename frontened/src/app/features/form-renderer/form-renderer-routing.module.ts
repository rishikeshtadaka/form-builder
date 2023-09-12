import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { CollectionsComponent } from './cs-collections/collections.component';
import { environment } from '@environments/environment';

const customerRoutes = [
  // { path: 'form-renderer/collections/:collectionId="bff4bb9a-76fb-45aa-a820-a4b5d726a263"/forms/:formsId="096fa981-a2a5-464b-ae87-dc8af2da4004"', component: FormRendererComponent },
  { path: '', component: CollectionsComponent },
  { path: 'form-renderer', component: FormRendererComponent },
  { path: 'requests', component: CollectionsComponent },
  { path: 'requests/:requestId', component: FormRendererComponent },
];

const adminRoutes = [
  // { path: 'form-renderer/collections/:collectionId="bff4bb9a-76fb-45aa-a820-a4b5d726a263"/forms/:formsId="096fa981-a2a5-464b-ae87-dc8af2da4004"', component: FormRendererComponent },
  { path: '', component: CollectionsComponent },
  { path: 'form-renderer', component: FormRendererComponent },
  { path: 'responses', component: CollectionsComponent },
  { path: 'responses/:requestId', component: FormRendererComponent },
];

const routes: Routes = (environment.mode === 'ADMIN') ? adminRoutes
: (environment.mode === 'CUSTOMER') ? customerRoutes
  : [];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRendererRoutingModule { }
