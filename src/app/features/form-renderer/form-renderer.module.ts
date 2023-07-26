import { NgModule } from '@angular/core';
import { FormRendererRoutingModule } from './form-renderer-routing.module';
import { FormRendererComponent } from './form-renderer/form-renderer.component';

@NgModule({
  declarations: [FormRendererComponent],
  imports: [FormRendererRoutingModule],
  providers: [],
  exports: [],
})
export class FormRendererModule {}
