import { Injectable } from '@angular/core';
import { DatePickerComponent } from '@shared/components/form-builder/date-picker/date-picker.component';
import { DropdownListComponent } from '@shared/components/form-builder/dropdown-list/dropdown-list.component';
import { TextAreaComponent } from '@shared/components/form-builder/text-area/text-area.component';
import { TextBoxComponent } from '@shared/components/form-builder/text-box/text-box.component';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { ToolKitListModel, ToolKitModel } from '../view-models/tool-kit.model';

@Injectable({ providedIn: 'root' })
export class FormBuilderComponentRegistryService {
  private toolKitListModel = new ToolKitListModel();

  constructor() {
    this.setToolKitList();
  }

  public getComponent(componentName: string): ToolKitModel {
    let component = this.toolKitListModel.get(componentName);
    if (component) return component;
    throw `Component:${componentName} not found`;
  }

  public getComponents(): ToolKitListModel {
    return this.toolKitListModel;
  }

  private setToolKitList(): void {
    this.toolKitListModel.add(
      new ToolKitModel(
        FormBuilderComponentConstant.textBox,
        'Text Box',
        TextBoxComponent
      )
    );
    this.toolKitListModel.add(
      new ToolKitModel(
        FormBuilderComponentConstant.textArea,
        'Text Area',
        TextAreaComponent
      )
    );
    this.toolKitListModel.add(
      new ToolKitModel(
        FormBuilderComponentConstant.datePicker,
        'Datepicker',
        DatePickerComponent
      )
    );
    this.toolKitListModel.add(
      new ToolKitModel(
        FormBuilderComponentConstant.dropdownlist,
        'Dropdownlist',
        DropdownListComponent
      )
    );
  }
}
