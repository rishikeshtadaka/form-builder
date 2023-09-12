import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { CollectionsComponent } from './cs-collections/collections.component';

const routes: Routes = [
  { path: 'form-responses', component: FormRendererComponent },
  { path: '', component: FormRendererComponent },
  { path: 'requests', component: CollectionsComponent },
  { path: 'requests/:requestId', component: FormRendererComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormResponsesRoutingModule { }
