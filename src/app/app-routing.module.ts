import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './features/form-builder/form-builder/form-builder.component';

const routes: Routes = [
  { path: 'form-builder', component: FormBuilderComponent },
  { path: '**', component: FormBuilderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
