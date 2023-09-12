import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ElementJsonModel } from '@core/model/form-json.model';
import { FormBuilderComponentRegistryService } from '@features/form-builder/core/form-builder-component-registry.service';
import { ViewContainerDirective } from '@shared/directives/view-container.directive';
import { BaseElementRendererComponent } from '../base-element-renderer.component';

@Component({
  selector: 'cs-row-renderer',
  templateUrl: './row-renderer.component.html',
  styleUrls: ['./row-renderer.component.scss']
})
export class RowRendererComponent extends BaseElementRendererComponent {

  constructor(injector:Injector) { 
    super(injector);
  }

  override ngOnInit(): void {  
  }

}
