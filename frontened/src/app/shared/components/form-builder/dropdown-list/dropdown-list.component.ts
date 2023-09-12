import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TextBoxConfigurationsModel } from '@shared/view-models/text-box-configurations.model';
import { DropdownConfigurationsModel } from '@shared/view-models/dropdown-configurations.model';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';

@Component({
  selector: 'cs-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss'],
})
export class DropdownListComponent
  extends BaseFormBuilderComponent<DropdownConfigurationsModel, string>
  implements OnInit {

  public labelName: string = 'Dropdown List';
  public selectedValue: null;

  listItemsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
    this.configurations = new DropdownConfigurationsModel();
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
    return FormBuilderComponentConstant.dropdownlist;
  }

  selectionChange(event: any): void {
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
