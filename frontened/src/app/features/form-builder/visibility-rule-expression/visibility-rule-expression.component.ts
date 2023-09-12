import { Component, Input, OnInit } from '@angular/core';
import { ExpressionModel } from '@core/model/visibility-configuration.model';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import { FormBuilderComponentTypeConstant } from '@shared/static/form-builder-component.type';
@Component({
  selector: 'cs-visibility-rule-expression',
  templateUrl: './visibility-rule-expression.component.html',
  styleUrls: ['./visibility-rule-expression.component.scss'],
})
export class VisibilityRuleExpressionComponent implements OnInit {
  @Input()
  public expression: ExpressionModel;
  @Input()
  public isRoot: boolean = true;
  @Input()
  public hide: boolean = false;
  @Input()
  public componentsName: any[] = [];
  @Input()
  public componentIds: any;
  @Input()
  public childIndex: number;
  @Input()
  public parentIndex: number;
  @Input()
  public isEdit: boolean = false;

  numberOperations = [
    { value: 'gt', viewValue: 'Greater Than' },
    { value: 'lt', viewValue: 'Less Than' },
    { value: 'gtoet', viewValue: 'Greater Than Or Equal To' },
    { value: 'ltoet', viewValue: 'Less than Or Equal To' },
    { value: 'et', viewValue: 'Equals to' },
  ];
  stringOperations = [
    { value: 'con', viewValue: 'Contains' },
    { value: 'et', viewValue: 'Equals to' },
  ];
  matSource: any = {};

  constructor(public formBuilderDomService: FormBuilderDomRegistryService) {}

  ngOnInit(): void {
    this.matSource =
      this.expression.type === FormBuilderComponentTypeConstant.numberBox
        ? this.numberOperations
        : this.stringOperations;

    if (this.parentIndex >= 0 && !this.isEdit) {
      this.addFirstExpression();
    }
    this.expression.isConditionValid=true;
    this.expression.isFieldNameValid=true;
    this.expression.isConnectorConditionValid=true;
    
    
    
  }

  onSelectedType(event: any): void {
    this.expression.isFieldNameValid=true;

    let selectedComponent = this.formBuilderDomService.getComponent(
      event.value
    );
    let type = selectedComponent.formBuilderComponent.getConfigurations().type;
    if (type == FormBuilderComponentTypeConstant.numberBox) {
      this.matSource = this.numberOperations;
      this.expression.type = type;
    } else {
      this.matSource = this.stringOperations;
      this.expression.type = type;
    }
  }
  addFirstExpression(){
    this.expression.childrens = this.expression.childrens || [];
    this.expression.childrens?.push({  condition:"If",
    sourceElementId: '',
    type:'',
    operator: '',
    value: '',
    lookup: '',
    isFieldNameValid:false,
    isConditionValid:false,
    isConnectorConditionValid:true,
    });
  }

  addExpression(): void {
    this.expression.childrens = this.expression.childrens || [];
    // this.expression.childrens?.push(new ExpressionModel());
    this.expression.childrens?.push({  condition:"",
    sourceElementId: '',
    type:'',
    operator: '',
    value: '',
    lookup: '',
    isFieldNameValid:false,
    isConditionValid:false,
    isConnectorConditionValid:false,
    })
    console.log(this.expression);
    
  }

  removeExpression(i: number) {
    this.expression.childrens?.splice(i, 1);
    console.log(this.expression);
    if(this.expression.childrens){
      this.expression.childrens[0].condition="If";
    }
  }

  public conditionSelectionChanged(){
    this.expression.isConditionValid=true;
  }
  childConditionSelectionChanged(i:number){
    if(this.expression.childrens){
      this.expression.childrens[i].isConnectorConditionValid=true;
    }
  }
}
