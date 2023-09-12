import { EventEmitter, Injectable } from "@angular/core";
import { ComputationConfigurationModel } from "@core/model/computation-configuration.model";
import { ValidationRulesConfigurationModel } from "@core/model/validation-configuration.model";
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';

@Injectable({providedIn:'root'})
export class FormBuilderComponentEventEmitterService{
    public currentConfigurationElementId:string;
    private openConfiguration:EventEmitter<string>=new EventEmitter<string>();
    private elementConfiguration:EventEmitter<any>=new EventEmitter<any>();
    private setVisibility:EventEmitter<any>=new EventEmitter<VisibilityRulesConfigurationModel>();
    private setValidation:EventEmitter<ValidationRulesConfigurationModel>=new EventEmitter<ValidationRulesConfigurationModel>();
    private setComputation:EventEmitter<ComputationConfigurationModel>=new EventEmitter<ComputationConfigurationModel>();
    
    public listenOpenConfigurations():EventEmitter<string>{
        return this.openConfiguration;
    }

    public emitOpenConfigurations(elementId:string):void{
        this.currentConfigurationElementId=elementId;
        return this.openConfiguration.emit(elementId);
    }

    public listenSetVisibility(): EventEmitter<VisibilityRulesConfigurationModel>{
        return this.setVisibility;
    }

    public emitSetVisibility(visibility:VisibilityRulesConfigurationModel):void{
        this.setVisibility.emit(visibility);
    }

    public listenSetValidation(): EventEmitter<ValidationRulesConfigurationModel>{
        return this.setValidation;
    }

    public emitSetValidation(validation:ValidationRulesConfigurationModel):void{
        this.setValidation.emit(validation);
    }

    public listenSetComputation(): EventEmitter<ComputationConfigurationModel>{
        return this.setComputation;
    }

    public emitSetComputation(computation:ComputationConfigurationModel):void{
        this.setComputation.emit(computation);
    }

    public listenElementConfigurations():EventEmitter<any>{
        return this.elementConfiguration;
    }

    public emitElementConfigurations(elementConfigurations:any):void{
        this.elementConfiguration.emit(elementConfigurations);
    }

}