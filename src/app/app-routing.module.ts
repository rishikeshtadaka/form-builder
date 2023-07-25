import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { PrivateLayoutComponent } from './core/components/private-layout/private-layout.component';

const routes: Routes = [
  { path: '', component: PrivateLayoutComponent,children:[
    {
      path:'',
      loadChildren:()=> import('./features/form-builder/form-builder.module').then((m)=>m.FormBuilderModule)
    }
  ] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
