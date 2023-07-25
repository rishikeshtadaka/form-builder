import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from "./form-builder/form-builder.component";

const routes: Routes = [
  { path: 'form-builder', component: FormBuilderComponent },
  { path: '', component: FormBuilderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class FormBuilderRoutingModule{

}