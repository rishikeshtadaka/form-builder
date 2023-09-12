import { Component, Inject, OnInit, Type, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElementResponseJsonModel, FormJsonModel, FormResponseJsonModel } from '@core/model/form-json.model';
import { IContainerRendereComponent } from '@features/form-renderer/icontainer-renderer.component';
import { RowRendererComponent } from '@features/form-renderer/row-renderer/row-renderer.component';
import { SectionRendererComponent } from '@features/form-renderer/section-renderer/section-renderer.component';
import { IFormBuilderComponent } from '@shared/components/base/iform-builder.component';
import { ViewContainerDirective } from '@shared/directives/view-container.directive';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { FormBuilderComponentRegistryService } from '../core/form-builder-component-registry.service';

@Component({
  selector: 'cs-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent implements OnInit {
  @ViewChild(ViewContainerDirective, { static: true })
  componentHost!: ViewContainerDirective;

  public screenHeight: any;

  constructor(@Inject(MAT_DIALOG_DATA) public formJsonModel: FormResponseJsonModel, private formBuilderComponentRegistryService: FormBuilderComponentRegistryService) { }

  ngOnInit(): void {
    this.screenHeight = window.innerHeight;
    this.renderElements();
  }

  private renderElements(): void {
    for (let i = 0; i < this.formJsonModel.elements.length; i++) {
      let element = this.formJsonModel.elements[i];
      this.renderElement(element);
    }
  }

  protected renderElement(element: ElementResponseJsonModel): void {
    if (element.type === FormBuilderComponentConstant.row) {
      this.renderContainer(element, RowRendererComponent);
      return;
    }
    if (element.type === FormBuilderComponentConstant.section) {
      this.renderContainer(element, SectionRendererComponent);
      return;
    }
    const viewContainerRef = this.componentHost.viewContainerRef;
    let e = this.formBuilderComponentRegistryService.getComponent(element.type);
    let newlyCreatedComponent =
      viewContainerRef?.createComponent<IFormBuilderComponent>(e.component)
        .instance!;
    newlyCreatedComponent.setConfigurations(element.configurations.general);
  }

  renderContainer(
    element: ElementResponseJsonModel,
    component: Type<any>
  ): void {
    const viewContainerRef = this.componentHost.viewContainerRef;
    let containerComponent =
      viewContainerRef?.createComponent<IContainerRendereComponent>(component)
        .instance!;
    containerComponent.elements = element.elements;
    containerComponent.setConfigurations(element.configurations.general)
  }
}
