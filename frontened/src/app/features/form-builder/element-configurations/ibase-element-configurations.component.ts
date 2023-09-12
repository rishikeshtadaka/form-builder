import { ComputationConfigurationModel } from "@core/model/computation-configuration.model";
import { ValidationRulesConfigurationModel } from "@core/model/validation-configuration.model";
import { VisibilityRulesConfigurationModel } from "@core/model/visibility-configuration.model";

export interface IBaseElementConfigurationsComponent{
    getConfigurations():any;
    setConfigurations(configurations:any):void;
    getVisibility(): VisibilityRulesConfigurationModel[];
    setVisibility(visibility:VisibilityRulesConfigurationModel[]):void;
    getValidation(): ValidationRulesConfigurationModel[];
    setValidation(validation:ValidationRulesConfigurationModel[]):void;
    getComputation(): ComputationConfigurationModel[];
    setComputation(computation:ComputationConfigurationModel[]):void;
}