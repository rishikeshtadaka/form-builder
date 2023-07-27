import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilderComponentRegistryService } from '../core/form-builder-component-registry.service';
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
    private formBuilderComponentRegistryService: FormBuilderComponentRegistryService
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
  }

  public save(): void {
    //this.formContainer.get(0).
    console.log('Save');
  }
}
