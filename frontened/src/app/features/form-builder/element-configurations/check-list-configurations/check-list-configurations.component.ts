import { Component, OnInit } from '@angular/core';
import { BaseElementConfigurationsComponent } from '../base-element-configurations.component';
import { DropdownConfigurationsModel } from '@shared/view-models/dropdown-configurations.model';
import { ChecklistConfigurationsModel } from '@shared/view-models/checklist-configurations.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cs-check-list-configurations',
  templateUrl: './check-list-configurations.component.html',
  styleUrls: ['./check-list-configurations.component.scss']
})
export class CheckListConfigurationsComponent extends BaseElementConfigurationsComponent<ChecklistConfigurationsModel>
implements OnInit {

  

  listItemsForm: FormGroup;
  
  constructor() { 
    super();
    this.configurations = new ChecklistConfigurationsModel();
    this.configurations.items.push("");
  }

  ngOnInit(): void {
  }

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
