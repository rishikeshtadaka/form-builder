import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ElementJsonModel, ElementResponseJsonModel } from '@core/model/form-json.model';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { BaseElementRendererComponent } from '../base-element-renderer.component';
import { RowRendererComponent } from '../row-renderer/row-renderer.component';

@Component({
  selector: 'cs-section-renderer',
  templateUrl: './section-renderer.component.html',
  styleUrls: ['./section-renderer.component.scss']
})
export class SectionRendererComponent extends BaseElementRendererComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  renderRow(element: ElementResponseJsonModel): void {
    const viewContainerRef = this.componentHost.viewContainerRef;
    let row = viewContainerRef?.createComponent(
      RowRendererComponent
    ).instance!;
    // disabled all child elements if parent disabled
    if (this.configurations.disable) {
      element.configurations.general.disable = true;
      element.elements.forEach(element => {
        element.configurations.general.disable = true;
      });
    }
    row.elements = element.elements;
  }

  override renderElements(): void {
    if (this.elements && this.elements.length > 0) {
      for (let i = 0; i < this.elements.length; i++) {
        let element = this.elements[i];
        if (element.type === FormBuilderComponentConstant.row)
          this.renderRow(element);
        else {
          this.renderElement(element);
        }
      }
    }
  }

}
