import { Component, OnInit } from '@angular/core';
import { BaseElementConfigurationsComponent } from '../base-element-configurations.component';
import { TextAreaConfigurationsModel } from '@shared/view-models/text-area-configurations.model';

@Component({
  selector: 'cs-text-area-configurations',
  templateUrl: './text-area-configurations.component.html',
  styleUrls: ['./text-area-configurations.component.scss']
})
export class TextAreaConfigurationsComponent extends BaseElementConfigurationsComponent<TextAreaConfigurationsModel>
implements OnInit {

  constructor() {
    super();
    this.configurations=new TextAreaConfigurationsModel();
   }

  ngOnInit(): void {
  }

}
