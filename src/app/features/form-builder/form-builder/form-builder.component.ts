import { Component, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { TextBoxComponent } from 'src/app/shared/components/form-builder/text-box/text-box.component';
import { FormBuilderComponentService } from '../core/form-builder-component.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  private draggingElementIdLiteral:string="draggingElementId";
  private moveEventName:string="move";
  @ViewChildren('formContainer',{read:ViewContainerRef})
  private formContainer:QueryList<ViewContainerRef>;

  constructor(private formBuilderComponentService:FormBuilderComponentService) { }

  public ngOnInit(): void {
  }

  public dragstartHandler(ev:any):void {
    ev.dataTransfer.setData(this.draggingElementIdLiteral, ev.target.id);
    ev.dataTransfer.effectAllowed = this.moveEventName;
  }

  public dragoverHandler(ev:any):void {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = this.moveEventName;
  }

  public dropHandler(ev:any):void {
    ev.preventDefault();
    const elementId = ev.dataTransfer.getData(this.draggingElementIdLiteral);
    //ev.target.appendChild(this.getClonedElement(elementId));
    let component=this.formBuilderComponentService.getComponent(elementId);
    this.formContainer.get(0)?.createComponent(component);
  }

  public getClonedElement(elementId:string):Node{
    let node=document.getElementById(elementId);
    if(!node) {
      throw(`Element id is missing or element is not found with id: ${elementId}`);      
    };

    let clonedElement= node.cloneNode(true);
    (clonedElement as any)["id"]=this.getUniqueName(elementId);
    return clonedElement;
  }

  getUniqueName(prefix:string="elment"):string{
    return `${prefix}-${new Date().getTime()}`;
  }

}
