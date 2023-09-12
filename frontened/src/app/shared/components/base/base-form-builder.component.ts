import { Component, Injector, Input } from '@angular/core';
import { StyleConfiguration } from '@shared/view-models/style-configuration.model';
import { IFormBuilderComponent } from './iform-builder.component';
import { ElementJsonModel } from '@core/model/form-json.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';
import { CustomErrorStateMatcher } from './error-matcher.component';
import { ValidationRulesConfigurationModel } from '@core/model/validation-configuration.model';

@Component({
  template: ''
})
export abstract class BaseFormBuilderComponent<TypeConfigurations, TypeValue>
  implements IFormBuilderComponent {
  @Input() public id?: String;
  @Input() public value: TypeValue;
  @Input() public visible: Boolean = true;
  @Input() public error: string = '';
  @Input() public valid: Boolean = true;
  @Input() public configurations: TypeConfigurations;
  @Input() styleConfiguration: StyleConfiguration;
  @Input() public visibilityConfiguration: VisibilityRulesConfigurationModel[];
  @Input() public validityConfiguration: ValidationRulesConfigurationModel[];
  matcher = new CustomErrorStateMatcher();
  @Input() public autoOptions?: any[] = [];
  public isLoading : boolean = false;

  constructor() {
  }

  public abstract getComponentName(): string;

  public getConfigurations(): TypeConfigurations {
    return this.configurations;
  }

  public setConfigurations(configurations: TypeConfigurations): void {
    this.configurations = configurations;
  }

  public getValue(): TypeValue {
    return this.value;
  }

  public setValue(value: TypeValue): void {
    this.value = value;
  }

  public getVisibilityConfigurations(): VisibilityRulesConfigurationModel[] {
    return this.visibilityConfiguration;
  }

  public setVisibilityConfigurations(visibilityConfiguration: VisibilityRulesConfigurationModel[]): void {
    this.visibilityConfiguration = visibilityConfiguration;
  }

  public getId(): string {
    return this.id as any;
  }

  public setId(id: string): any {
    this.id = id;
  }

  public setVisibility(value: boolean) {
    this.visible = value;
  }

  public isVisible() {
    return this.visible;
  }

  public setError(error: string): any {
    this.error = error;
  }

  public getValidityConfigurations(): ValidationRulesConfigurationModel[] {
    return this.validityConfiguration;
  }

  public setValidityConfigurations(visibilityConfiguration: ValidationRulesConfigurationModel[]): void {
    this.validityConfiguration = visibilityConfiguration;
  }

  public isValid(): Boolean {
    return this.valid as Boolean;
  }

  public setValid(valid: Boolean): any {
    this.valid = valid;
  }

  public setAutoOptions(autoOptions: any): any {
    return this.autoOptions = autoOptions;
  }

  public getAutoOptions(): any {
    return this.autoOptions;
  }

  public setLoading(loading: boolean): any {
    return this.isLoading = loading;
  }
}
