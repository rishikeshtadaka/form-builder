import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { RowConfigurationsModel } from '@shared/view-models/row-configurations.model';
import { IFormBuilderContainerComponent } from '../core/iform-builder-container.component';
import { ElementJsonModel } from '@core/model/form-json.model';
import { ColumnElementModel } from '@shared/view-models/column-elements.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
export interface Tile {
  id: string;
  color: string;
  text: string;
}

@Component({
  selector: 'cs-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent extends BaseFormBuilderComponent<RowConfigurationsModel,string> implements OnInit,IFormBuilderContainerComponent{
 
  public elements:ElementJsonModel[]=[];

  constructor() {
    super();
    this.configurations=new RowConfigurationsModel();
  }
  ngOnInit(): void {
    if(this.elements==null){
      this.elements=[]
      this.elements?.push(ElementJsonModel.getEmptyElement());
    }
    else if(this.elements.length==0){
      this.elements?.push(ElementJsonModel.getEmptyElement());
    }
    
    
    this.renderElements();//For Edit
  }
  ngOnChanges(): void{
    console.log("Row Onchanges!");
  }
  public override setConfigurations(configurations: RowConfigurationsModel): void {
    this.configurations = configurations;
    this.elements=[];
    for(let i=0;i<configurations.numberOfColumns;i++){
      this.elements.push(ElementJsonModel.getEmptyElement())
    }
  }

  override getComponentName(): string {
    return FormBuilderComponentConstant.row;
  }
  public override getValue():string{
    return this.value;
  }
  
  public override setValue(value:string):void{
    this.value=value;
  }

  public renderElements():void{
    this.configurations.numberOfColumns=this.elements.length;
  }

  public override setId(value:string):void{
    this.id=value;
  }
}
