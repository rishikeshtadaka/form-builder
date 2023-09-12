import { Injectable } from '@angular/core';
import { DropdownListComponent } from '@shared/components/form-builder/dropdown-list/dropdown-list.component';
import { TextAreaComponent } from '@shared/components/form-builder/text-area/text-area.component';
import { TextBoxComponent } from '@shared/components/form-builder/text-box/text-box.component';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { RowComponent } from '../row/row.component';
import {
  ComponentPaletteModel,
  ComponentModel,
} from '../view-models/component-palette.model';
import { SectionComponent } from '../section/section.component';
import { LabelComponent } from '@shared/components/form-builder/label/label.component';
import { CheckBoxComponent } from '@shared/components/form-builder/check-box/check-box.component';
import { ChecklistComponent } from '@shared/components/form-builder/checklist/checklist.component';
import { RadioButtonComponent } from '@shared/components/form-builder/radio-button/radio-button.component';
import { ComponentWrapperComponent } from '../component-wrapper/component-wrapper.component';
import { RowConfigurationsComponent } from '../element-configurations/row-configurations/row-configurations.component';
import { TextBoxConfigurationsComponent } from '../element-configurations/text-box-configurations/text-box-configurations.component';
import { DropdownConfigurationsComponent } from '../element-configurations/drop-down-configurations/dropdown-configurations.component';
import { RadioButtonConfigurationsComponent } from '../element-configurations/radio-button-configurations/radio-button-configurations.component';
import { ChecklistConfigurationsModel } from '@shared/view-models/checklist-configurations.model';
import { LabelConfigurationsComponent } from '../element-configurations/label-configurations/label-configurations.component';
import { CheckListConfigurationsComponent } from '../element-configurations/check-list-configurations/check-list-configurations.component';
import { SectionConfigurationsComponent } from '../element-configurations/section-configurations/section-configurations.component';
import { TextAreaConfigurationsComponent } from '../element-configurations/text-area-configurations/text-area-configurations.component';
import { NumberBoxComponent } from '@shared/components/form-builder/number-box/number-box.component';
import { NumberBoxConfigurationsModel } from '@shared/view-models/number-box-configurations.model';
import { NumberConfigurationsComponent } from '../element-configurations/number-configurations/number-configurations.component';

@Injectable({ providedIn: 'root' })
export class FormBuilderComponentRegistryService {
  private componentPaletteModel = new ComponentPaletteModel();

  constructor() {
    this.setToolKitList();
  }

  public getComponent(componentName: string): ComponentModel {
    let component = this.componentPaletteModel.get(componentName);    
    if (component) return component;
    throw `Component:${componentName} not found`;
  }

  public getComponents(): ComponentPaletteModel {
    return this.componentPaletteModel;
  }

  private setToolKitList(): void {
    this.componentPaletteModel.add(
      new ComponentModel(
        FormBuilderComponentConstant.label,
        'Label',
        LabelComponent,
        '../../../../assets/images/elements/label-icon.svg',
        LabelConfigurationsComponent
      )
    );
    this.componentPaletteModel.add(
      new ComponentModel(
        FormBuilderComponentConstant.textBox,
        'Short Text',
        TextBoxComponent,
        '../../../../assets/images/elements/short-text.svg',
        TextBoxConfigurationsComponent
      )
    );
    this.componentPaletteModel.add(
      new ComponentModel(
        FormBuilderComponentConstant.textArea,
        'Long Text',
        TextAreaComponent,
        '../../../../assets/images/elements/long-text.svg',
        TextAreaConfigurationsComponent
      )
    );
    this.componentPaletteModel.add(
      new ComponentModel(
        FormBuilderComponentConstant.numberBox,
        'Number',
        NumberBoxComponent,
        '../../../../assets/images/elements/number.svg',
        NumberConfigurationsComponent
      )
    );
    this.componentPaletteModel.add(
      new ComponentModel(
        FormBuilderComponentConstant.dropdownlist,
        'Dropdown',
        DropdownListComponent,
        '../../../../assets/images/elements/dropdown-icon.svg',
        DropdownConfigurationsComponent
      )
    );
    
    this.componentPaletteModel.add(
      new ComponentModel(
        FormBuilderComponentConstant.radioButton,
        'Single Selection',
        RadioButtonComponent,
        '../../../../assets/images/elements/single-selection-icon.svg',
        RadioButtonConfigurationsComponent
      )
    );
    this.componentPaletteModel.add(
      new ComponentModel(
        FormBuilderComponentConstant.checkList,
        'Multiple Selection',
        ChecklistComponent,
        '../../../../assets/images/elements/multi-selection-icon.svg',
        CheckListConfigurationsComponent
      )
    );
    this.componentPaletteModel.addLayout(
      new ComponentModel(
        FormBuilderComponentConstant.row,
        'Row',
        RowComponent,
        '../../../../assets/images/elements/row.svg',
        RowConfigurationsComponent
      )
    );
    this.componentPaletteModel.addLayout(
      new ComponentModel(
        FormBuilderComponentConstant.section,
        'Section',
        SectionComponent,
        '../../../../assets/images/elements/section.svg',
        SectionConfigurationsComponent
      )
    );
  }
}
