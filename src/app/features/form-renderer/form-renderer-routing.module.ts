import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRendererComponent } from './form-renderer/form-renderer.component';

const routes: Routes = [
  { path: 'form-renderer', component: FormRendererComponent },
  { path: '', component: FormRendererComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRendererRoutingModule {}
