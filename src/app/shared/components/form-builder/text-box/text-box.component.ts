import { Component, OnInit } from '@angular/core';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';

@Component({
  selector: 'cs-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent
  extends BaseFormBuilderComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {}

  public override getJson(): any {
    return {
      lable: 'new text box label',
      width: 200,
    };
  }

  public override setJson(json: any): void {}
}
