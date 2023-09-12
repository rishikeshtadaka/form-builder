import {
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { IFormBuilderComponent } from '@shared/components/base/iform-builder.component';
import { FormBuilderComponentRegistryService } from '../core/form-builder-component-registry.service';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import { ViewContainerDirective } from '../../../shared/directives/view-container.directive';
import { ComponentWrapperComponent } from '../component-wrapper/component-wrapper.component';
import { ElementJsonModel } from '@core/model/form-json.model';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { SectionConfigurationModel } from '@shared/view-models/section-configuration.model';
import { IFormBuilderContainerComponent } from '../core/iform-builder-container.component';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';
import { MatSelectChange } from '@angular/material/select';
import { ElementsSingleSelectDdlComponent } from '../elements-single-select-ddl/elements-single-select-ddl.component';

export interface Tile {
  id: string;
  color: string;
  text: string;
}

@Component({
  selector: 'cs-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent extends BaseFormBuilderComponent<SectionConfigurationModel, string> implements OnInit, IFormBuilderContainerComponent {

  private draggingElementIdLiteral: string = 'draggingElementId';
  private moveEventName: string = 'move';
  public selected: string = '';

  @ViewChild(ViewContainerDirective, { static: true }) componentHost!: ViewContainerDirective;

  private componentInstance: IFormBuilderComponent;

  public column: number = 1;
  public noOfColumns: number = 1;
  public displayOptions: boolean = false;
  public color: string = '#8f1d642';

  constructor(
    private formBuilderComponentRegistryService: FormBuilderComponentRegistryService,
    private formBuilderDomRegistryService: FormBuilderDomRegistryService,
  ) {
    super();
    this.configurations = new SectionConfigurationModel();
  }
  @ViewChild("elementSelection") elementSelection: ElementsSingleSelectDdlComponent;

  elements: ElementJsonModel[];

  ngOnInit(): void {    
    this.renderElements();//For Edit
  }

  public dragoverHandler(ev: any): void {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = this.moveEventName;
  }

  public dropHandler(ev: any): void {
    ev.stopPropagation();
    ev.preventDefault();
    const elementId = ev.dataTransfer.getData(this.draggingElementIdLiteral);
    const viewContainerRef = this.componentHost.viewContainerRef;
    let wrapperComponent = viewContainerRef?.createComponent(
      ComponentWrapperComponent
    ).instance!;

    wrapperComponent.element = ElementJsonModel.getElementWithType(elementId);
  }

  renderElement(element: ElementJsonModel): void {
    const viewContainerRef = this.componentHost.viewContainerRef;
    let wrapperComponent = viewContainerRef?.createComponent(
      ComponentWrapperComponent
    ).instance!;
    wrapperComponent.element = element;
  }

  public renderElements(): void {
    if (this.elements && this.elements.length > 0) {
      for (let i = 0; i < this.elements?.length; i++) {
        let element = this.elements[i];
        this.renderElement(element);
      }
    }
  }
  override getComponentName(): string {
    return FormBuilderComponentConstant.section;
  }

  public addElement(item: MatSelectChange): void {
    if (!item.value) return;

    let selectedElement = item.value;
    let element = ElementJsonModel.getElementWithType(selectedElement);
    this.renderElement(element);
    // this.elementSelection.reset();
  }
}
