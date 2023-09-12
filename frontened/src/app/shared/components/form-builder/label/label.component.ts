import { Component, Input, OnInit } from '@angular/core';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { LabelConfigurationsModel } from '@shared/view-models/label-configurations.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';

@Component({
  selector: 'cs-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends BaseFormBuilderComponent<LabelConfigurationsModel,string> implements OnInit {

  public labelName: string = 'Enter the label text';

  constructor() { 
    super();
    this.configurations=new LabelConfigurationsModel();
  }

  ngOnInit(): void {
  }

  override getComponentName(): string {
    return FormBuilderComponentConstant.label;
  }
}
