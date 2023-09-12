import { Component, OnInit } from '@angular/core';
import { StyleConfiguration } from '@shared/view-models/style-configuration.model';
import { StyleUtil } from '@shared/utils/styles-util';
@Component({
  selector: 'cs-common-style-configuration',
  templateUrl: './common-style-configuration.component.html',
  styleUrls: ['./common-style-configuration.component.scss']
})
export class CommonStyleConfigurationComponent implements OnInit {  
  public styleConfiguration:StyleConfiguration;
  public height: number;
  
  fontFamilyTypes: any[] = StyleUtil.fontFamilyTypes;
  alignTextTypes: any[] = StyleUtil.alignTextTypes;
  fontStyleTypes: any[] = StyleUtil.fontStyleTypes;
  constructor() { 
    this.styleConfiguration=new StyleConfiguration();    
  }

  ngOnInit(): void {
  }

}
