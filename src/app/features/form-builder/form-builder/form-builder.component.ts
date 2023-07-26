import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilderComponentService } from '../core/form-builder-component.service';
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
    private formBuilderComponentService: FormBuilderComponentService
  ) {
    this.toolKitListModel = this.formBuilderComponentService.getComponents();
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
    //ev.target.appendChild(this.getClonedElement(elementId));
    let component = this.formBuilderComponentService.getComponent(elementId);
    this.formContainer.get(0)?.createComponent(component.component);
  }

  public save(): void {}

  // public getClonedElement(elementId:string):Node{
  //   let node=document.getElementById(elementId);
  //   if(!node) {
  //     throw(`Element id is missing or element is not found with id: ${elementId}`);
  //   };

  //   let clonedElement= node.cloneNode(true);
  //   (clonedElement as any)["id"]=this.getUniqueName(elementId);
  //   return clonedElement;
  // }

  // getUniqueName(prefix: string = 'element'): string {
  //   return `${prefix}-${new Date().getTime()}`;
  // }
}
