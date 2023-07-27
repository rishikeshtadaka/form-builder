import { Injectable } from '@angular/core';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';

@Injectable({ providedIn: 'root' })
export class FormBuilderDomRegistryService {
  private components: Map<string, BaseFormBuilderComponent>;
  constructor() {
    this.components = new Map<string, BaseFormBuilderComponent>();
  }

  public setComponent(id: string, component: BaseFormBuilderComponent): void {
    this.components.set(id, component);
  }

  public getComponent(id: string): BaseFormBuilderComponent {
    if (!this.components.has(id)) throw `Component not found with id:${id}`;

    return this.components.get(id)!;
  }

  public getFirstComponent(): BaseFormBuilderComponent {
    const [firstKey] = this.components.keys();
    return this.components.get(firstKey)!;
  }
}
