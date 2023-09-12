import { Component, OnInit } from '@angular/core';
import { LabelConfigurationsModel } from '@shared/view-models/label-configurations.model';
import { BaseElementConfigurationsComponent } from '../base-element-configurations.component';

@Component({
  selector: 'cs-label-configurations',
  templateUrl: './label-configurations.component.html',
  styleUrls: ['./label-configurations.component.scss']
})
export class LabelConfigurationsComponent extends BaseElementConfigurationsComponent<LabelConfigurationsModel>
implements OnInit {

  constructor() { 
    super();
    this.configurations = new LabelConfigurationsModel()
  }

  ngOnInit(): void {
  }

}
