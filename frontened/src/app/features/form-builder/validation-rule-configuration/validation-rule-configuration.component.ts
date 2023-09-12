import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ExpressionModel,
  ValidationRulesConfigurationModel,
} from '@core/model/validation-configuration.model';
import { BaseElementConfigurationsComponent } from '../element-configurations/base-element-configurations.component';
import { FormBuilderComponentEventEmitterService } from '../core/form-builder-component-event-emitter.service';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import { ToastMessageService } from '@core/services/toast-message.service';

@Component({
  selector: 'cs-validation-rule-configuration',
  templateUrl: './validation-rule-configuration.component.html',
  styleUrls: ['./validation-rule-configuration.component.scss'],
})
export class ValidationRuleConfigurationComponent
  extends BaseElementConfigurationsComponent<ValidationRuleConfigurationComponent>
  implements OnInit
{
  validationConditionsForm: FormGroup;
  public validationObject = new ValidationRulesConfigurationModel();
  public filtered: any;
  public componentsName: any;
  public componentIds: any;
  public isEdit: boolean = false;
  public expressions: ExpressionModel[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ValidationRulesConfigurationModel,
    private fb: FormBuilder,
    private formBuilderComponentEventEmitterService: FormBuilderComponentEventEmitterService,
    public formBuilderDomService: FormBuilderDomRegistryService,
    public dialogRef: MatDialogRef<ValidationRuleConfigurationComponent>,
    public toastMessageService:ToastMessageService

  ) {
    super();
    this.filtered =
      this.formBuilderDomService.getAllComponentExceptSectionAndRow();

    this.componentsName = [...this.filtered.values()];
    this.componentIds = [...this.filtered.keys()];
    this.testData();
  }

  ngOnInit(): void {
    if (this.data) {
      this.validationObject = this.data;
      console.log(JSON.stringify(this.validationObject));
      this.expressions = this.validationObject.expressions;
      this.isEdit = true;
    }
    this.validationObject.isActionValid=true;
    this.validationObject.isNameValid=true;
  }

  private testData(): void {
    this.expressions = [];
    this.expressions.push({
      condition:"If",
      sourceElementId: "no-source",
      operator: 'no-operator',
      value: '',
      lookup: '',
      childrens:[],
      isFieldNameValid:true,
      isConditionValid:true,
      isConnectorConditionValid:true
  
  });
  }
  private isValidVisVibilityConfiguration:boolean=true;
  private checkValidVisibilityConfiguration(expressions?:ExpressionModel[]):void{
    if(!expressions || expressions.length===0) return;
    for(let i=0;i<expressions.length;i++){
      let expression=expressions[i];
      
      if(!expression.operator) expression.isConditionValid=false;
      if(!expression.sourceElementId) expression.isFieldNameValid=false;
      if(!this.validationObject.name) this.validationObject.isNameValid=false;
      if(!this.validationObject.message) this.validationObject.isActionValid=false;
      if(!expression.condition) expression.isConnectorConditionValid=false;

      if(this.isValidVisVibilityConfiguration) {
        console.log(expression.isConditionValid,expression.isFieldNameValid,expression.isConnectorConditionValid);
        this.isValidVisVibilityConfiguration=expression.isConditionValid && expression.isFieldNameValid && expression.isConnectorConditionValid && this.validationObject.isNameValid && this.validationObject.isActionValid;
      }
      // this.visibilityObject.isNameValid && this.visibilityObject.isActionValid && this.visibilityObject.isElementIdValid
      this.checkValidVisibilityConfiguration(expression.childrens);
    }
  }
  private isValidConfiguration():boolean{
    this.checkValidVisibilityConfiguration(this.expressions);
    return this.isValidVisVibilityConfiguration;
  }

  saveValidation() {
    this.validationObject.expressions = this.expressions;
    console.log(JSON.stringify(this.validationObject));
    this.isValidVisVibilityConfiguration=true;
    if(!this.isValidConfiguration()) {
      this.toastMessageService.error("Please provide details for all mandatory fields")
      
      return;
    }

    this.formBuilderComponentEventEmitterService.emitSetValidation(
      this.validationObject
    );
    console.log(JSON.stringify(this.validationObject))

    this.dialogRef.close();
  }
  addExpression(i: number): void {
    this.expressions.push({
      condition:"",
      sourceElementId: "no-source",
      operator: 'no-operator',
      value: '',
      lookup: '',
      isFieldNameValid:true,
      isConditionValid:true,
      isConnectorConditionValid:false
  
  })
    if(this.isEdit){
      this.expressions[i+1].childrens = this.expressions[i+1].childrens || [];
      this.expressions[i+1].childrens?.push({  condition:"If",
      sourceElementId: '',
      operator: '',
      value: '',
      lookup: '',
      isFieldNameValid:false,
      isConditionValid:false,
      isConnectorConditionValid:true,
      });
    }
  }

  removeExpression(i: number) {
    this.expressions?.splice(i, 1);
    if(this.expressions){
      this.expressions[0].condition="If";
    }
  }
  actionSelectionChanged(){
    this.validationObject.isActionValid=true;
  }
  
  titleChanged(){
    this.validationObject.isNameValid=true;
  }
  parentConditionSelectionChanged(i:number){
    this.expressions[i].isConnectorConditionValid=true;
  }
}