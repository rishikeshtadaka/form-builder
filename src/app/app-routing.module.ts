import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormRendererComponent } from './form-renderer/form-renderer.component';

const routes: Routes = [
  { path: 'form-builder', component: FormBuilderComponent },
  { path: 'form-renderer', component: FormRendererComponent },
  { path: '**', component: FormBuilderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
