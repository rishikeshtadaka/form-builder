import { Component, Input, OnInit } from '@angular/core';
import { TextBoxConfigurationsModel } from '@shared/view-models/text-box-configurations.model';
import { BaseElementConfigurationsComponent } from '../base-element-configurations.component';

@Component({
  selector: 'cs-text-box-configurations',
  templateUrl: './text-box-configurations.component.html',
  styleUrls: ['./text-box-configurations.component.scss']
})
export class TextBoxConfigurationsComponent extends BaseElementConfigurationsComponent<TextBoxConfigurationsModel> implements OnInit {
  
  constructor() { 
    super();
    this.configurations=new TextBoxConfigurationsModel();
  }
  
  ngOnInit(): void {
  }

}
