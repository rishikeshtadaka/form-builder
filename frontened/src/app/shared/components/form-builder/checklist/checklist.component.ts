import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { ChecklistConfigurationsModel } from '@shared/view-models/checklist-configurations.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'cs-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent
  extends BaseFormBuilderComponent<ChecklistConfigurationsModel, any>
  implements OnInit {
  constructor() {
    super();
    this.configurations = new ChecklistConfigurationsModel();
  }

  ngOnInit() {
    if (this.value !== undefined&& this.value!==null&&this.value!=='') {
      this.value = this.value.split(',');
    }
    let config = this.getVisibilityConfigurations();
    if (this.visible == undefined && config.length > 0) {
      this.visible = false;
    }
    else if (this.visible == undefined) {
      this.visible = true;
    }
  }

  override getComponentName(): string {
    return FormBuilderComponentConstant.checkList;
  }

  selectionChange(event: MatSelectionListChange): void {
    const customEvent = new CustomEvent(
      'DropDownChange',
      {
        detail: {
          target: {
            value: this.value,
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
