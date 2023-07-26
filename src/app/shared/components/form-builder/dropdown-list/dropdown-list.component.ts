import { Component, OnInit } from '@angular/core';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';

@Component({
  selector: 'cs-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss'],
})
export class DropdownListComponent
  extends BaseFormBuilderComponent
  implements OnInit
{
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor() {
    super();
  }

  ngOnInit(): void {}

  public override getJson(): any {
    return {
      lable: 'new ddl label',
      width: 200,
    };
  }
  public override setJson(json: any): void {}
}
