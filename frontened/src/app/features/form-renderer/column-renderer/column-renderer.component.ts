import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ElementJsonModel } from '@core/model/form-json.model';
import { FormBuilderComponentEncase } from '@features/form-builder/core/form-builder-component-encase';
import { FormBuilderComponentRegistryService } from '@features/form-builder/core/form-builder-component-registry.service';
import { FormBuilderDomRegistryService } from '@features/form-builder/core/form-builder-dom-registry.service';
import { IFormBuilderComponent } from '@shared/components/base/iform-builder.component';
import { ViewContainerDirective } from '@shared/directives/view-container.directive';

@Component({
  selector: 'cs-column-renderer',
  templateUrl: './column-renderer.component.html',
  styleUrls: ['./column-renderer.component.scss']
})
export class ColumnRendererComponent implements OnInit {
  @Input() element:ElementJsonModel;
  
  @ViewChild(ViewContainerDirective,{static:true}) componentHost!:ViewContainerDirective;

  constructor(protected formBuilderComponentRegistryService:FormBuilderComponentRegistryService,
    private formBuilderDomRegistryService:FormBuilderDomRegistryService) { }

  protected renderElement():void{
    const viewContainerRef=this.componentHost.viewContainerRef;
    let e=this.formBuilderComponentRegistryService.getComponent(this.element.type);
    let newlyCreatedComponent = viewContainerRef?.createComponent<IFormBuilderComponent>(
        e.component
    ).instance!;
    newlyCreatedComponent.setConfigurations(this.element.configurations.general);
    newlyCreatedComponent.setValue(this.element.value);
    newlyCreatedComponent.setId(this.element.id);
    // newlyCreatedComponent.setVisibility(this.element.visible);
    newlyCreatedComponent.setConfigurations(this.element.configurations.general)
    newlyCreatedComponent.setVisibilityConfigurations(this.element.configurations.visibility);
    newlyCreatedComponent.setValidityConfigurations(this.element.configurations.validation);

    this.formBuilderDomRegistryService.setComponent(Math.random().toString(),new FormBuilderComponentEncase(newlyCreatedComponent));
}

  ngOnInit(): void {
    this.renderElement();
  }

}
