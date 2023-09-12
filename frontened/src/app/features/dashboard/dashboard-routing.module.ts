import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionsComponent } from './cs-collections/collections.component';
import { FormsComponent } from './forms/forms.component';
import { FormscontainerComponent } from './formscontainer/formscontainer.component';
import { ArchivesComponent } from './archives/archives.component';
import { FormBuilderComponent } from '@features/form-builder/form-builder/form-builder.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          { path: 'collections', component: CollectionsComponent },
          { path: 'collections/:collectionId', component: FormsComponent },
          { path: 'forms', component: FormscontainerComponent },
          { path: 'archives', component: ArchivesComponent },
          { path: '', component: CollectionsComponent },
        ],
      },
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
