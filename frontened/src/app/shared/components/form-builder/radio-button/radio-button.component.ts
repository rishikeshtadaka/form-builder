import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { RadioButtonConfigurationsModel } from '@shared/view-models/radiobutton-configurations.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';

@Component({
  selector: 'cs-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent extends BaseFormBuilderComponent<RadioButtonConfigurationsModel, string>
  implements OnInit {

  constructor() {
    super();
    this.configurations = new RadioButtonConfigurationsModel();
  }
  ngOnInit(): void {
    let config = this.getVisibilityConfigurations();
    if (this.visible == undefined && config.length > 0) {
      this.visible = false;
    }
    else if (this.visible == undefined) {
      this.visible = true;
    }
  }

  override getComponentName(): string {
    return FormBuilderComponentConstant.radioButton;
  }

  onChange(event: any) {
    const customEvent = new CustomEvent(
      'DropDownChange',
      {
        detail: {
          target: {
            value: event.value,
            name: this.configurations.name,
            getAttribute: (name: string) => {
              return this.configurations.name;
            }
          }
        }
      }
    );
    window.dispatchEvent(customEvent)
  }
}
