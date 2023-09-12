import { Type } from '@angular/core';
import { TextBoxConfigurationsComponent } from '../element-configurations/text-box-configurations/text-box-configurations.component';

export class ComponentModel {
  constructor(
    public componentName: string,
    public componentDisplayName: string,
    public component: any,
    public src: any,
    public elementConfiguration:
      | Type<any>
      | undefined = TextBoxConfigurationsComponent, //TODO: Remove default value
    public showInPalette: boolean = true
  ) {}
}

export class ComponentPaletteModel {
  public components: ComponentModel[];
  public layoutComponents: ComponentModel[];
  constructor(
    components: ComponentModel[] = [],
    layoutComponents: ComponentModel[] = []
  ) {
    this.components = components;
    this.layoutComponents = layoutComponents;
  }
  public add(component: ComponentModel): void {
    this.components.push(component);
  }
  public addLayout(component: ComponentModel): void {
    this.layoutComponents.push(component);
  }

  public get(componentName: string): ComponentModel | undefined {
    if (componentName == 'cs-section' || componentName == 'cs-row') {
      return this.layoutComponents.find(
        (t) => t.componentName === componentName
      );
    } else {
      return this.components.find((t) => t.componentName === componentName);
    }
  }
}
