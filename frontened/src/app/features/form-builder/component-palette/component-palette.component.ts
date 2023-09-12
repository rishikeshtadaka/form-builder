import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@features/common-features/base-components/base.component';
import { FormBuilderComponentRegistryService } from '../core/form-builder-component-registry.service';
import { ComponentPaletteModel } from '../view-models/component-palette.model';

@Component({
  selector: 'cs-component-palette',
  templateUrl: './component-palette.component.html',
  styleUrls: ['./component-palette.component.scss']
})
export class ComponentPaletteComponent extends BaseComponent implements OnInit {
  private draggingElementIdLiteral: string = 'draggingElementId';
  private moveEventName: string = 'move'; 

  public componentPalette = new ComponentPaletteModel();

  constructor(injector:Injector,private formBuilderComponentRegistryService: FormBuilderComponentRegistryService) { 
    super(injector);
    this.componentPalette =
      this.formBuilderComponentRegistryService.getComponents();
  }

  ngOnInit(): void {
  }  

  public dragstartHandler(ev: any): void {
    ev.dataTransfer.setData(this.draggingElementIdLiteral, ev.target.id);
    ev.dataTransfer.effectAllowed = this.moveEventName;
  }
  

}
