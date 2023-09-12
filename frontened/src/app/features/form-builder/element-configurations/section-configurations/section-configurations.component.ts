import { Component, OnInit } from '@angular/core';
import { BaseElementConfigurationsComponent } from '../base-element-configurations.component';
import { SectionConfigurationModel } from '@shared/view-models/section-configuration.model';

@Component({
  selector: 'cs-section-configurations',
  templateUrl: './section-configurations.component.html',
  styleUrls: ['./section-configurations.component.scss']
})
export class SectionConfigurationsComponent extends BaseElementConfigurationsComponent<SectionConfigurationModel>implements OnInit {

  constructor() { 
    super();
    this.configurations=new SectionConfigurationModel();

  }

  ngOnInit(): void {
  }

}
