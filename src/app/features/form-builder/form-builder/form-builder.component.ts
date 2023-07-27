import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { LoggerService } from '@core/services/logger.service';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { FormBuilderComponentRegistryService } from '../core/form-builder-component-registry.service';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import { ToolKitListModel } from '../view-models/tool-kit.model';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  private draggingElementIdLiteral: string = 'draggingElementId';
  private moveEventName: string = 'move';
  @ViewChildren('formContainer', { read: ViewContainerRef })
  private formContainer: QueryList<ViewContainerRef>;

  public toolKitListModel = new ToolKitListModel();

  constructor(
    private formBuilderComponentRegistryService: FormBuilderComponentRegistryService,
    private formBuilderDomRegistryService: FormBuilderDomRegistryService
  ) {
    this.toolKitListModel =
      this.formBuilderComponentRegistryService.getComponents();
  }

  public ngOnInit(): void {}

  public dragstartHandler(ev: any): void {
    ev.dataTransfer.setData(this.draggingElementIdLiteral, ev.target.id);
    ev.dataTransfer.effectAllowed = this.moveEventName;
  }

  public dragoverHandler(ev: any): void {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = this.moveEventName;
  }

  public dropHandler(ev: any): void {
    ev.preventDefault();
    const elementId = ev.dataTransfer.getData(this.draggingElementIdLiteral);
    let component =
      this.formBuilderComponentRegistryService.getComponent(elementId);
    let createdComponent = this.formContainer
      .get(0)
      ?.createComponent(component.component).instance;
    let baseComponent = createdComponent as BaseFormBuilderComponent;
    //baseComponent.setJson({lableName:"testing"});//TODO: Remove
    //console.log(baseComponent.getComponentId());
    this.formBuilderDomRegistryService.setComponent('', baseComponent);
  }

  public save(): void {
    let firstComponent = this.formBuilderDomRegistryService.getFirstComponent();
    console.log('Save', firstComponent.getJson());
  }
}
