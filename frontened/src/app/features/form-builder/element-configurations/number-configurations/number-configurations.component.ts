import { Component, OnInit } from '@angular/core';
import { NumberBoxConfigurationsModel } from '@shared/view-models/number-box-configurations.model';
import { BaseElementConfigurationsComponent } from '../base-element-configurations.component';

@Component({
  selector: 'cs-number-configurations',
  templateUrl: './number-configurations.component.html',
  styleUrls: ['./number-configurations.component.scss']
})
export class NumberConfigurationsComponent extends BaseElementConfigurationsComponent<NumberBoxConfigurationsModel>
implements OnInit {

  constructor() {
    super();
    this.configurations=new NumberBoxConfigurationsModel();
   }

  ngOnInit(): void {
  }

}
