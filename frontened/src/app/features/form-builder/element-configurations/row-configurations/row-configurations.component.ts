import { Component, OnInit } from '@angular/core';
import { RowConfigurationsModel } from '@shared/view-models/row-configurations.model';
import { BaseElementConfigurationsComponent } from '../base-element-configurations.component';

@Component({
  selector: 'cs-row-configurations',
  templateUrl: './row-configurations.component.html',
  styleUrls: ['./row-configurations.component.scss']
})
export class RowConfigurationsComponent extends BaseElementConfigurationsComponent<RowConfigurationsModel>
implements OnInit {

  constructor() { 
    super();
    this.configurations = new RowConfigurationsModel()
  }
  

  ngOnInit(): void {
  }

}
