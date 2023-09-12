import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { FormBuilderComponentRegistryService } from '../core/form-builder-component-registry.service';
import { ComponentModel, ComponentPaletteModel } from '../view-models/component-palette.model';

@Component({
  selector: 'cs-elements-single-select-ddl',
  templateUrl: './elements-single-select-ddl.component.html',
  styleUrls: ['./elements-single-select-ddl.component.scss']
})
export class ElementsSingleSelectDdlComponent implements OnInit{
  @Input() public selected:string='';
  @Output() public selectionChange=new EventEmitter<MatSelectChange>();

  public elements: ComponentModel[];

  constructor(private formBuilderComponentRegistryService: FormBuilderComponentRegistryService) { }

  ngOnInit(): void {
    this.elements = [...this.formBuilderComponentRegistryService.getComponents().components];   
    this.elements.push(this.formBuilderComponentRegistryService.getComponent(FormBuilderComponentConstant.row));
  }

  public emitSelectionChange(item:MatSelectChange):void{
    this.selectionChange.emit(item);
    this.selected=this.selected=='-1'?'0':"-1";
    
  }

  // public reset():void{    
  //   this.selected=this.selected=='-1'?'0':"-1";
  //   // this.selected='-1';
  // }
  

}
