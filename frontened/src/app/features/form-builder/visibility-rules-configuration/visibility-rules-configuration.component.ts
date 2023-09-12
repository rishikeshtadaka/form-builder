import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBaseElementConfigurationsComponent } from '../element-configurations/ibase-element-configurations.component';
import { FormBuilderComponentEventEmitterService } from '../core/form-builder-component-event-emitter.service';
import { BaseElementConfigurationsComponent } from '../element-configurations/base-element-configurations.component';
import {
  ExpressionModel,
  VisibilityRulesConfigurationModel,
} from '@core/model/visibility-configuration.model';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConditionalLogicDataService } from '@core/services/conditional-logic-data.service';
import { FormJsonModel } from '@core/model/form-json.model';
import { filter } from 'rxjs/operators';
import { FormBuilderComponentEncase } from '../core/form-builder-component-encase';
import { FormBuilderComponentTypeConstant } from '@shared/static/form-builder-component.type';
import * as exp from 'constants';
import { ToastMessageService } from '@core/services/toast-message.service';
import { log } from 'console';
@Component({
  selector: 'cs-visibility-rules-configuration',
  templateUrl: './visibility-rules-configuration.component.html',
  styleUrls: ['./visibility-rules-configuration.component.scss'],
})
export class VisibilityRulesConfigurationComponent
  extends BaseElementConfigurationsComponent<VisibilityRulesConfigurationModel>
  implements OnInit
{
  visibilityConditionsForm: FormGroup;
  public selectedVisibleElementName: string;
  public selectedVisibleElementId: string;
  public filtered: Map<string, FormBuilderComponentEncase>;
  public componentsName: any[] = [];
  public componentIds: any;
  public formResponseFromFormBuilder: FormJsonModel;
  public visibilityObject = new VisibilityRulesConfigurationModel();
  public isNumber: boolean = false;
  public expressions: ExpressionModel[];
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private formBuilderComponentEventEmitterService: FormBuilderComponentEventEmitterService,
    public formBuilderDomService: FormBuilderDomRegistryService,
    public conditionalLogicDataService: ConditionalLogicDataService,
    public dialogRef: MatDialogRef<VisibilityRulesConfigurationComponent>,
    public toastMessageService:ToastMessageService
  ) {
    super();

    // this.formBuilderComponentEventEmitterService
    //   .listenElementConfigurations()
    //   .subscribe((elementConfigurations) => {
    //     this.selectedVisibleElementName = elementConfigurations.label;
    //     this.selectedVisibleElementId =
    //       this.formBuilderComponentEventEmitterService.currentConfigurationElementId;
    //   });

    this.filtered =
      this.formBuilderDomService.getAllComponentExceptSectionRowAndProvidedComponentId(
        this.formBuilderComponentEventEmitterService
          .currentConfigurationElementId
      );

    this.componentsName = [...this.filtered.values()];
    this.componentIds = [...this.filtered.keys()];

    this.testData();
    // this.visibilityObject.isActionValid=true;
    // this.visibilityObject.isNameValid=true;
    // this.visibilityObject.isElementIdValid=true;
    // for(let i=0;i<this.expressions.length;i++){
    //   this.expressions[i].isParentConditionValid=true;
    //   console.log(i);
    // }
  }

  private testData(): void {
    this.expressions = [];
    this.expressions.push({
      condition:"If",
      sourceElementId: "no-source",
      type:'',
      operator: 'no-operator',
      value: '',
      lookup: '',
      childrens:[],
      isFieldNameValid:true,
      isConditionValid:true,
      isConnectorConditionValid:true
  
  });
  }
  onSelectedType(event: any, i: number): void {
    let selectedComponent = this.formBuilderDomService.getComponent(
      event.value
    );
    let type = selectedComponent.formBuilderComponent.getConfigurations().type;
    if (type == FormBuilderComponentTypeConstant.numberBox) {
      this.matSource[i] = this.numberOperations;
      this.visibilityObject.expressions[i].type = type;
    } else {
      this.matSource[i] = this.stringOperations;
      this.visibilityObject.expressions[i].type = type;
    }
  }

  ngOnDestroy() {
    this.filtered.clear();
  }

  ngOnInit(): void {
    console.log(this.expressions);
    if(!this.data.data && this.data.currentComponentId){
      this.selectedVisibleElementId=this.data.currentComponentId;
      let selectedComponent = this.formBuilderDomService.getComponent(
        this.selectedVisibleElementId
        );
      this.selectedVisibleElementName = selectedComponent.formBuilderComponent.getConfigurations().label;
      // console.log("CurrentComponentId", this.data.currentComponentId);
    }
    if (this.data.data && this.data.currentComponentId) {
      this.visibilityObject = this.data.data;
      this.selectedVisibleElementId=this.data.currentComponentId;
      let selectedComponent = this.formBuilderDomService.getComponent(
        this.selectedVisibleElementId
        );
      this.selectedVisibleElementName = selectedComponent.formBuilderComponent.getConfigurations().label;
      for (let i = 0; i < this.visibilityObject.expressions.length; i++) {
        this.matSource[i] =
          this.visibilityObject.expressions[i].type ===
          FormBuilderComponentTypeConstant.numberBox
            ? this.numberOperations
            : this.stringOperations;
      }
      this.expressions = this.visibilityObject.expressions;
      this.isEdit = true;
    }
    this.visibilityObject.isActionValid=true;
    this.visibilityObject.isNameValid=true;
    this.visibilityObject.isElementIdValid=true;
    // for(let i=0;i<this.expressions.length;i++){
    //   this.expressions[i].isConnectorConditionValid=true;
    //   console.log(i);
    // }
  }

  private isValidVisVibilityConfiguration:boolean=true;

  private checkValidVisibilityConfiguration(expressions?:ExpressionModel[]):void{
    if(!expressions || expressions.length===0) return;
    for(let i=0;i<expressions.length;i++){
      let expression=expressions[i];
      
      if(!expression.operator) expression.isConditionValid=false;
      if(!expression.sourceElementId) expression.isFieldNameValid=false;
      if(!this.visibilityObject.name) this.visibilityObject.isNameValid=false;
      if(!this.visibilityObject.action) this.visibilityObject.isActionValid=false;
      if(!this.visibilityObject.elementId) this.visibilityObject.isElementIdValid=false;
      if(!expression.condition) expression.isConnectorConditionValid=false;

      if(this.isValidVisVibilityConfiguration) {
        console.log(expression.isConditionValid,expression.isFieldNameValid,expression.isConnectorConditionValid);
        this.isValidVisVibilityConfiguration=expression.isConditionValid && expression.isFieldNameValid && expression.isConnectorConditionValid && this.visibilityObject.isNameValid && this.visibilityObject.isActionValid && this.visibilityObject.isElementIdValid;
      }
      // this.visibilityObject.isNameValid && this.visibilityObject.isActionValid && this.visibilityObject.isElementIdValid
      this.checkValidVisibilityConfiguration(expression.childrens);
    }
  }

private isValidConfiguration():boolean{
  this.checkValidVisibilityConfiguration(this.expressions);
  return this.isValidVisVibilityConfiguration;
}

  saveVisibility() {
    this.visibilityObject.expressions = this.expressions;
    console.log(JSON.stringify(this.visibilityObject))

    this.isValidVisVibilityConfiguration=true;
    if(!this.isValidConfiguration()) {
      this.toastMessageService.error("Please provide details for all mandatory fields")
      
      return;
    }
    this.formBuilderComponentEventEmitterService.emitSetVisibility(
      this.visibilityObject
    );
    console.log(JSON.stringify(this.visibilityObject))
    this.dialogRef.close();
  }
  addExpression(i:number): void {
    // this.expressions.push(new ExpressionModel());
    this.expressions.push({
      condition:"",
      sourceElementId: "no-source",
      type:'',
      operator: 'no-operator',
      value: '',
      lookup: '',
      // childrens:[],
      isFieldNameValid:true,
      isConditionValid:true,
      isConnectorConditionValid:false
  
  })
    console.log(this.expressions);
    // for(let i=0;i<this.expressions.length;i++){
    //   this.expressions[i].isConnectorConditionValid=true;
    //   console.log(i);
    // }
    
    if(this.isEdit){
      console.log("inedit");
      
      this.expressions[i+1].childrens = this.expressions[i+1].childrens || [];
      this.expressions[i+1].childrens?.push({  condition:"If",
      sourceElementId: '',
      type:'',
      operator: '',
      value: '',
      lookup: '',
      isFieldNameValid:false,
      isConditionValid:false,
      isConnectorConditionValid:true,
      });

      console.log(this.expressions);
      
      // for(let i=0;i<this.expressions.length;i++){
      //   this.expressions[i].isParentConditionValid=true;
      //   console.log(i);
      // }
    }
    
  }

  removeExpression(i: number) {
    this.expressions?.splice(i, 1);
    if(this.expressions){
      this.expressions[0].condition="If";
    }
  }
  actionSelectionChanged(){
    this.visibilityObject.isActionValid=true;
  }
  fieldSelectionChanged(){
    this.visibilityObject.isElementIdValid=true;
  }
  titleChanged(){
    this.visibilityObject.isNameValid=true;
  }
  parentConditionSelectionChanged(i:number){
    this.expressions[i].isConnectorConditionValid=true;
  }
}

