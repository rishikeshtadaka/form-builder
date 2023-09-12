import { Component, OnInit } from '@angular/core';
import { DropdownConfigurationsModel } from '@shared/view-models/dropdown-configurations.model';
import { BaseElementConfigurationsComponent } from '../base-element-configurations.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { timeout } from 'rxjs';

@Component({
  selector: 'cs-dropdown-configurations',
  templateUrl: './dropdown-configurations.component.html',
  styleUrls: ['./dropdown-configurations.component.scss']
})
export class DropdownConfigurationsComponent extends BaseElementConfigurationsComponent<DropdownConfigurationsModel>
implements OnInit {
  
  constructor() {
    super();
    this.configurations = new DropdownConfigurationsModel();
    this.configurations.items.push("");
   }

  ngOnInit(): void {}

  addListItem() {
    this.configurations.items.push("");
  }

  removeListItem(i: number) {
    this.configurations.items.splice(i,1);
  }

  trackByFn(index: any, item: any) :number{
    return index;
  }

}

