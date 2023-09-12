import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormResponsesRoutingModule } from './form-responses-routing.module';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { SectionRendererComponent } from './section-renderer/section-renderer.component';
import { RowRendererComponent } from './row-renderer/row-renderer.component';
import { ColumnRendererComponent } from './column-renderer/column-renderer.component';
import { CollectionsComponent } from './cs-collections/collections.component';
import { SharedModule } from '@shared/shared.module';
import { CdkStepper } from '@angular/cdk/stepper';


@NgModule({
  declarations: [FormRendererComponent, SectionRendererComponent, RowRendererComponent, ColumnRendererComponent,CollectionsComponent],
  imports: [FormResponsesRoutingModule,SharedModule,CommonModule],
  providers: [CdkStepper],
  exports: [],

})
export class FormResponsesModule { }
