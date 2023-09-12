import { Component, Input, OnInit } from '@angular/core';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { NumberBoxConfigurationsModel } from '@shared/view-models/number-box-configurations.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
@Component({
  selector: 'cs-number-box',
  templateUrl: './number-box.component.html',
  styleUrls: ['./number-box.component.scss'],
})
export class NumberBoxComponent
  extends BaseFormBuilderComponent<NumberBoxConfigurationsModel, string>
  implements OnInit
{
  constructor() {
    super();
    this.configurations = new NumberBoxConfigurationsModel();
  }

  ngOnInit(): void {
    let config = this.getVisibilityConfigurations();
    if (this.visible == undefined && config.length > 0) {
      this.visible = false;
    } else if (this.visible == undefined) {
      this.visible = true;
    }
    if (!this.autoOptions || this.autoOptions == undefined) {
      this.autoOptions = [];
    }
  }
  changeEvent(event: any) : boolean{
    if (event.key === 'e' || event.key === '.') {
      event.stopPropagation();
      return false;
    }
    return true;
  }
  override getComponentName(): string {
    return FormBuilderComponentConstant.numberBox;
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.valid = true;
  }
}
