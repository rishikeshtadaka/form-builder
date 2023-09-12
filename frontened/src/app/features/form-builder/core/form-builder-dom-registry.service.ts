import { Injectable } from '@angular/core';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { FormBuilderComponentEncase } from './form-builder-component-encase';
import { FormArray, FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormBuilderDomRegistryService {
  private components: Map<string, FormBuilderComponentEncase>;
  private form: FormArray;
  constructor() {
    this.components = new Map<string, FormBuilderComponentEncase>();
  }

  public setComponent(id: string, component: FormBuilderComponentEncase): void {
    this.components.set(id, component);
  }
  public getAllComponents():Map<string, FormBuilderComponentEncase>{
    return this.components;
  }
  public getComponent(id: string): FormBuilderComponentEncase {
    if (!this.components.has(id)) throw `Component not found with id:${id}`;
  
    return this.components.get(id)!;  
  }

  public deleteComponent(id: string):void{
    this.components.delete(id);
  }

  public getComponentType(id:string):string{
    let c=this.getComponent(id);
    return c.formBuilderComponent.getConfigurations().type;
  }

  public getFirstComponent(): FormBuilderComponentEncase {
    const [firstKey] = this.components.keys();
    return this.components.get(firstKey)!;
  }

  public getAllNumericExceptProvidedComponentId(componentId:string):Map<string, FormBuilderComponentEncase>{
    var components = this.getAllComponents() 
      const numberBoxComponents = new Map(
        Array.from(components).filter(([_key, value]) => {
          if (_key != componentId && value.formBuilderComponent.getComponentName() == FormBuilderComponentConstant.numberBox) {
            return true;
          }
          return false;
        }),
      );
      return numberBoxComponents;
  }
  public getAllComponentExceptSectionAndRow():Map<string, FormBuilderComponentEncase>{
    var components = this.getAllComponents() 
      const numberBoxComponents = new Map(
        Array.from(components).filter(([_key, value]) => {
          if (value.formBuilderComponent.getComponentName() !== FormBuilderComponentConstant.section && value.formBuilderComponent.getComponentName() !== FormBuilderComponentConstant.row && value.formBuilderComponent.getComponentName() !== FormBuilderComponentConstant.label) {
            return true;
          }
          return false;
        }),
      );
      return numberBoxComponents;
  }

  public getAllComponentExceptSectionRowAndProvidedComponentId(componentId:string):Map<string, FormBuilderComponentEncase>{
    var components = this.getAllComponents() 
      const numberBoxComponents = new Map(
        Array.from(components).filter(([_key, value]) => {
          if (_key != componentId && value.formBuilderComponent.getComponentName() !== FormBuilderComponentConstant.section && value.formBuilderComponent.getComponentName() !== FormBuilderComponentConstant.row && value.formBuilderComponent.getComponentName() !== FormBuilderComponentConstant.label) {
            return true;
          }
          return false;
        }),
      );
      return numberBoxComponents;
  }

  public getAllRulesBaseComponents(componentId:string):Map<string, FormBuilderComponentEncase>{
    var components = this.getAllComponents() 
      const numberBoxComponents = new Map(
        Array.from(components).filter(([_key, value]) => {
          if (_key != componentId && [FormBuilderComponentConstant.numberBox, FormBuilderComponentConstant.checkBox, FormBuilderComponentConstant.radioButton, FormBuilderComponentConstant.dropdownlist].includes(value.formBuilderComponent.getComponentName()) ) {
            return true;
          }
          return false;
        }),
      );
      return numberBoxComponents;
  }

  public reset():void{
    this.components.clear();
  }

  public addFormControl(ele: FormControl): void {
    this.form.push(ele);
  }

  public getFormControl(): FormArray {
    return this.form;
  }
}