import { NgModule } from '@angular/core';
import { FormRendererRoutingModule } from './form-renderer-routing.module';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { SectionRendererComponent } from './section-renderer/section-renderer.component';
import { RowRendererComponent } from './row-renderer/row-renderer.component';
import { SharedModule } from '@shared/shared.module';
import { ColumnRendererComponent } from './column-renderer/column-renderer.component';
import { CollectionsComponent } from './cs-collections/collections.component';
import { CdkStepper } from '@angular/cdk/stepper';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';

@NgModule({
  declarations: [FormRendererComponent, SectionRendererComponent, RowRendererComponent, ColumnRendererComponent,CollectionsComponent, DialogErrorComponent],
  imports: [FormRendererRoutingModule,SharedModule],
  providers: [CdkStepper],
  exports: [],
})
export class FormRendererModule {}
