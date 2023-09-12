import { Component, Input, OnInit } from '@angular/core';
import { ExpressionModel } from '@core/model/validation-configuration.model';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import { FormBuilderComponentTypeConstant } from '@shared/static/form-builder-component.type';

@Component({
  selector: 'cs-validation-rule-expression',
  templateUrl: './validation-rule-expression.component.html',
  styleUrls: ['./validation-rule-expression.component.scss'],
})
export class ValidationRuleExpressionComponent implements OnInit {
  @Input()
  public expression: ExpressionModel;
  @Input()
  public isRoot: boolean = true;
  @Input()
  public parentIndex: number;
  @Input()
  public isEdit: boolean = false;
  @Input()
  public hide: boolean = false;
  @Input()
  public childIndex: number;
  @Input()
  public componentsName: any[] = [];
  @Input()
  public componentIds: any;

  numberOperations = [
    { value: 'gt', viewValue: 'Greater Than' },
    { value: 'lt', viewValue: 'Less Than' },
    { value: 'gtoet', viewValue: 'Greater Than Or Equal To' },
    { value: 'ltoet', viewValue: 'Less than Or Equal To' },
    { value: 'et', viewValue: 'Equals to' },
  ];

  constructor(public formBuilderDomService: FormBuilderDomRegistryService) {}

  ngOnInit(): void {
    console.log(this.expression);
    if (this.parentIndex >= 0 && !this.isEdit) {
      this.addFirstExpression();

    }
    this.expression.isConditionValid=true;
    this.expression.isFieldNameValid=true;
    this.expression.isConnectorConditionValid=true;
  }
  onSelectedType(){
    this.expression.isFieldNameValid=true;

  }
  addFirstExpression(){
    this.expression.childrens = this.expression.childrens || [];
    this.expression.childrens?.push({  condition:"If",
    sourceElementId: '',
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
    this.expression.childrens?.push({  condition:"",
    sourceElementId: '',
    operator: '',
    value: '',
    lookup: '',
    isFieldNameValid:false,
    isConditionValid:false,
    isConnectorConditionValid:false,
    })
  }

  removeExpression(i: number) {
    this.expression.childrens?.splice(i, 1);
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
