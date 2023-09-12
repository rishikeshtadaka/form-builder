import { ElementJsonModel } from "@core/model/form-json.model";
import { ValidationRulesConfigurationModel } from "@core/model/validation-configuration.model";

export interface IFormBuilderComponent {
    getConfigurations(): any;
    setConfigurations(json: any): void;
    getValue(): any;
    setValue(value: any): void;
    getComponentName(): string;
    setVisibilityConfigurations(json: any): void;
    getVisibilityConfigurations(): any;
    setId(id: any): void;
    getId(): any;
    setVisibility(value: Boolean): void;
    isVisible(): Boolean;
    setError(string: any): void;
    setValidityConfigurations(json: any): void;
    getValidityConfigurations(): ValidationRulesConfigurationModel[];
    isValid(): Boolean;
    setValid(valid: Boolean): void;
    setAutoOptions(value: any): void;
    getAutoOptions(): any;
    setLoading(value: any): void;
}