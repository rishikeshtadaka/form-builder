import { Component, OnInit } from '@angular/core';
import { BaseElementConfigurationsComponent } from '../base-element-configurations.component';
import { RadioButtonConfigurationsModel } from '@shared/view-models/radiobutton-configurations.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cs-radio-button-configurations',
  templateUrl: './radio-button-configurations.component.html',
  styleUrls: ['./radio-button-configurations.component.scss'],
})
export class RadioButtonConfigurationsComponent
  extends BaseElementConfigurationsComponent<RadioButtonConfigurationsModel>
  implements OnInit
{
  listItemsForm: FormGroup;

  constructor() {
    super();
    this.configurations = new RadioButtonConfigurationsModel();
    this.configurations.items.push('');
  }

  ngOnInit(): void {}

  addListItem() {
    this.configurations.items.push('');
  }

  removeListItem(i: number) {
    this.configurations.items.splice(i, 1);
  }

  trackByFn(index: any, item: any) :number{
    return index;
  }
}
