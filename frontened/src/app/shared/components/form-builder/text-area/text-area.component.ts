import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { TextAreaConfigurationsModel } from '@shared/view-models/text-area-configurations.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
@Component({
  selector: 'cs-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent
  extends BaseFormBuilderComponent<TextAreaConfigurationsModel,string>
  implements OnInit
{
  constructor() {
    super();
    this.configurations=new TextAreaConfigurationsModel();    
  }

  ngOnInit(): void {
    let config = this.getVisibilityConfigurations();
    if (this.visible == undefined && config.length > 0) {
      this.visible = false;
    }
    else if (this.visible == undefined) {
      this.visible = true;
    }
    if (!this.autoOptions || this.autoOptions == undefined) {
      this.autoOptions = [];
    }
  }

  public override getConfigurations(): any {
    return this.configurations;
  }

  override getComponentName(): string {
    return FormBuilderComponentConstant.textArea;
  }
  
  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.valid = true;
  }
}
