import { ComputationConfigurationModel } from "@core/model/computation-configuration.model";
import { ValidationRulesConfigurationModel } from "@core/model/validation-configuration.model";
import { VisibilityRulesConfigurationModel } from "@core/model/visibility-configuration.model";
import { IFormBuilderComponent } from "@shared/components/base/iform-builder.component";

export class FormBuilderComponentEncase {
    constructor(public formBuilderComponent:IFormBuilderComponent,
                private visibilityRulesConfiguration:VisibilityRulesConfigurationModel[]=[],
                private validationRulesConfiguration: ValidationRulesConfigurationModel[]=[],
                private computationRulesConfiguration: ComputationConfigurationModel[]=[]){
    }

    public getVisibility():VisibilityRulesConfigurationModel[]{
        return this.visibilityRulesConfiguration!;
    }
    public setVisibility(visibility: VisibilityRulesConfigurationModel[]): void{
       this.visibilityRulesConfiguration = visibility;
    }

    public getValidation() : ValidationRulesConfigurationModel[]{
        return this.validationRulesConfiguration;
    }
    public setValidation(validation:ValidationRulesConfigurationModel[]):void{
        this.validationRulesConfiguration=validation;
    }

    public getComputation() : ComputationConfigurationModel[]{
        return this.computationRulesConfiguration;
    }
    public setComputation(computation:ComputationConfigurationModel[]):void{
        this.computationRulesConfiguration=computation;
    }

    public pushOrUpdateVisibility(visibility: VisibilityRulesConfigurationModel): void{
        if(!visibility.visibilityRuleId){
            visibility.visibilityRuleId=this.getUniqueVisibilityId();
            this.visibilityRulesConfiguration.push(visibility);
            return;
        }
        for(let i=0;this.visibilityRulesConfiguration.length;i++){
            let vr=this.visibilityRulesConfiguration[i];
            if(vr.visibilityRuleId===visibility.visibilityRuleId){
                vr.action=visibility.action;
                vr.expressions=visibility.expressions;
                vr.name=visibility.name;
                vr.description=visibility.description;
                return;
            }
        }
     }

     public pushOrUpdateValidation(validation: ValidationRulesConfigurationModel): void{
        if(!validation.validationRuleId){
            validation.validationRuleId=this.getUniqueValidationId();
            this.validationRulesConfiguration.push(validation);
            return;
        }
        for(let i=0;this.validationRulesConfiguration.length;i++){
            let vr=this.validationRulesConfiguration[i];
            if(vr.validationRuleId===validation.validationRuleId){
                vr.message=validation.message;
                vr.expressions=validation.expressions;
                vr.name=validation.name;
                vr.description=validation.description;
                return;
            }
        }
     }

     public pushOrUpdateComputation(computation: ComputationConfigurationModel): void{
        if(!computation.computationRuleId){
            computation.computationRuleId=this.getUniqueComputationId();
            this.computationRulesConfiguration.push(computation);
            return;
        }
        for(let i=0;this.computationRulesConfiguration.length;i++){
            let vr=this.computationRulesConfiguration[i];
            if(vr.computationRuleId===computation.computationRuleId){
                vr.firstField=computation.firstField;
                vr.operator=computation.operator;
                vr.secondField=computation.secondField;
                vr.name=computation.name;
                vr.description=computation.description;
                return;
            }
        }
     }

     private getUniqueVisibilityId(): string {
        return `CS_Visibility_Rule_${new Date().getTime()}`;
      }
      private getUniqueValidationId(): string {
        return `CS_Validation_Rule_${new Date().getTime()}`;
      }
      private getUniqueComputationId(): string {
        return `CS_Validation_Rule_${new Date().getTime()}`;
      }
}