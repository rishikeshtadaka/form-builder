import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { TextBoxConfigurationsModel } from '@shared/view-models/text-box-configurations.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';

@Component({
  selector: 'cs-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent
  extends BaseFormBuilderComponent<TextBoxConfigurationsModel,string>
  implements OnInit
{
  
  date = new FormControl(new Date());
  public labelName: string = 'Date Of Birth';
  public placeholderText: string = 'Enter the placeholder text';
  public displayOptions: boolean = false;
  constructor() {
    super();
  }

  ngOnInit(): void {}

  public override getConfigurations(): any {
    return {
      lable: this.labelName,
      placeholder: this.placeholderText,
      width: 200,
    };
  }
  public override setConfigurations(json: any): void {
    this.labelName = json['lableName'];
    this.placeholderText = json['placeHoldertext'];
  }

  override getComponentName(): string {
    return FormBuilderComponentConstant.datePicker;
  }
}
