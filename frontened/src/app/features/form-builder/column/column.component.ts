import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { ComponentWrapperComponent } from '../component-wrapper/component-wrapper.component';
import { FormBuilderComponentRegistryService } from '../core/form-builder-component-registry.service';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import { ViewContainerDirective } from '../../../shared/directives/view-container.directive';
import { ColumnElementModel } from '@shared/view-models/column-elements.model';
import { ElementJsonModel, FormJsonModel } from '@core/model/form-json.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'cs-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @ViewChild(ViewContainerDirective, { static: true })
  componentHost!: ViewContainerDirective;
  @Input() element:ElementJsonModel;
  private draggingElementIdLiteral: string = 'draggingElementId';
  public selected:string = '';
  public isElement:boolean;
  constructor(private formBuilderComponentRegistryService: FormBuilderComponentRegistryService) { }

  ngOnInit(): void {
    this.loadComponent();//For edit
  }

  ngOnChanges():void{
    if(!this.element){
      this.isElement=false;
    }
  }

  private loadComponent():void{
    if(this.element && this.element.type)
      this.renderComponent(this.element);
  }

  public dragoverHandler(ev: any): void {
    ev.preventDefault();
  }

  public dropHandler(ev: any): void {
    ev.stopPropagation();
    ev.preventDefault();    
    const componentName = ev.dataTransfer.getData(this.draggingElementIdLiteral);
    this.element=ElementJsonModel.getElementWithType(componentName);
   this.renderComponent(this.element);
   this.isElement=true;
  }

  private renderComponent(element:ElementJsonModel):void{
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();
    let wrapperComponent= viewContainerRef.createComponent(
      ComponentWrapperComponent
    ).instance;
    wrapperComponent.element=element;
    wrapperComponent.deleteElement.subscribe(()=>{
      this.isElement=false;
    })
    this.isElement=true;
  }

  
  public addElement(item:MatSelectChange):void{
    if(!item.value) return;

    let selectedElement=item.value;
    let element=ElementJsonModel.getElementWithType(selectedElement);
    this.renderComponent(element);
  }

}
