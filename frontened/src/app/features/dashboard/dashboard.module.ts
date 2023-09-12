import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { CollectionsComponent } from './cs-collections/collections.component';
import { FormsComponent } from './forms/forms.component';
import { ArchivesComponent } from './archives/archives.component';
import { FormscontainerComponent } from './formscontainer/formscontainer.component';
import { FormBuilderComponent } from '@features/form-builder/form-builder/form-builder.component';
import { DeleteCollectionPopupComponent } from './cs-collections/delete-collection-popup/delete-collection-popup.component';
import { DeleteFormPopupComponent } from './forms/delete-form-popup/delete-form-popup.component';




@NgModule({
  declarations: [DashboardComponent, CollectionsComponent, FormsComponent, ArchivesComponent, FormscontainerComponent, DeleteCollectionPopupComponent, DeleteFormPopupComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
