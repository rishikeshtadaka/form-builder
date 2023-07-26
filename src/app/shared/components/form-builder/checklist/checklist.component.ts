import { Component, OnInit } from '@angular/core';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';

@Component({
  selector: 'cs-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent
  extends BaseFormBuilderComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {}

  public override getJson(): any {
    return {
      lable: 'new datepicker label',
      width: 200,
    };
  }
  public override setJson(json: any): void {}
}
