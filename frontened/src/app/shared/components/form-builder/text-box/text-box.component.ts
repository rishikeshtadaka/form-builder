import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { StyleConfiguration } from '@shared/view-models/style-configuration.model';
import { TextBoxConfigurationsModel } from '@shared/view-models/text-box-configurations.model';

@Component({
  selector: 'cs-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent
  extends BaseFormBuilderComponent<TextBoxConfigurationsModel, string>
  implements OnInit {

  constructor() {
    super();
    this.styleConfiguration = new StyleConfiguration();
    this.configurations = new TextBoxConfigurationsModel();
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

  override getComponentName(): string {
    return FormBuilderComponentConstant.textBox;
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.valid = true;
  }
}