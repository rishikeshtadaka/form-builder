import { Component, Input } from "@angular/core";
import { IBaseElementConfigurationsComponent } from "./ibase-element-configurations.component";
import { VisibilityRulesConfigurationModel } from "@core/model/visibility-configuration.model";
import { ValidationRulesConfigurationModel } from "@core/model/validation-configuration.model";
import { ComputationConfigurationModel } from "@core/model/computation-configuration.model";

@Component({
    template:''
})
export abstract class BaseElementConfigurationsComponent<T> implements IBaseElementConfigurationsComponent{
    @Input() public configurations:T;
    @Input() public visibility: VisibilityRulesConfigurationModel[] = [];
    @Input() public validation: ValidationRulesConfigurationModel[] = [];
    @Input() public computation: ComputationConfigurationModel[] = [];

    public getConfigurations():any{
        return this.configurations;
    }
    public setConfigurations(configurations:any):void{
        this.configurations=configurations;
    }
    public getVisibility() {
        return this.visibility;
    }
    public setVisibility(visibility:any):void{
        this.visibility=visibility;
    }
    public getValidation() {
        return this.validation;
    }
    public setValidation(validation:any):void{
        this.validation=validation;
    }
    public getComputation(){
        return this.computation;
    }
    public setComputation(computation:ComputationConfigurationModel[]):void{
        this.computation=computation;
    }

}