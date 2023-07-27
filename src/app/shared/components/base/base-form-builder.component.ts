import { IFormBuilderComponent } from './iform-builder.component';

export abstract class BaseFormBuilderComponent
  implements IFormBuilderComponent
{
  public componentId: string; //It will be used for dom manipulation in form builder

  constructor() {
    this.componentId = this.getUniqueId();
  }
  private getUniqueId(): string {
    return `CS_Element_${new Date().getTime()}`;
  }

  public getComponentId(): string {
    return this.componentId;
  }
  public abstract getJson(): any;
  public abstract setJson(json: any): void;
}
