import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilderComponentRegistryService } from '@features/form-builder/core/form-builder-component-registry.service';
import { FormBuilderDomRegistryService } from '@features/form-builder/core/form-builder-dom-registry.service';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';

export interface Tile {
  id: string;
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'cs-component-holder',
  templateUrl: './component-holder.component.html',
  styleUrls: ['./component-holder.component.scss'],
})
export class ComponentHolderComponent
  extends BaseFormBuilderComponent
  implements OnInit
{
  private draggingElementIdLiteral: string = 'draggingElementId';
  private moveEventName: string = 'move';
  tiles: Tile[] = [];
  @ViewChildren('formContainer', { read: ViewContainerRef })
  private formContainer: QueryList<ViewContainerRef>;

  constructor(
    private formBuilderComponentRegistryService: FormBuilderComponentRegistryService,
    private formBuilderDomRegistryService: FormBuilderDomRegistryService
  ) {
    super();
    this.tiles.push({
      id: this.getUniqueConainerId(),
      text: 'One',
      cols: 3,
      rows: 1,
      color: 'lightblue',
    });
    this.tiles.push({
      id: this.getUniqueConainerId(),
      text: 'Two',
      cols: 1,
      rows: 2,
      color: 'lightgreen',
    });
    this.tiles.push({
      id: this.getUniqueConainerId(),
      text: 'Three',
      cols: 1,
      rows: 1,
      color: 'lightpink',
    });
    this.tiles.push({
      id: this.getUniqueConainerId(),
      text: 'Four',
      cols: 2,
      rows: 1,
      color: '#DDBDF1',
    });
  }

  private getUniqueConainerId(): string {
    return `Container_${new Date().getTime()}_${Math.random()}`;
  }

  ngOnInit(): void {}

  public override getJson(): any {}
  public override setJson(json: any): void {}

  public dragoverHandler(ev: any): void {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = this.moveEventName;
  }

  public dropHandler(ev: any): void {
    debugger;
    ev.stopPropagation();
    ev.preventDefault();
    const elementId = ev.dataTransfer.getData(this.draggingElementIdLiteral);
    let component =
      this.formBuilderComponentRegistryService.getComponent(elementId);

    let id = this.getConainerIndex(ev.currentTarget.id);
    let createdComponent = this.formContainer
      .get(0)
      ?.createComponent(component.component).instance;
    let baseComponent = createdComponent as BaseFormBuilderComponent;
    //baseComponent.setJson({lableName:"testing"});//TODO: Remove
    //console.log(baseComponent.getComponentId());
    this.formBuilderDomRegistryService.setComponent('', baseComponent);
  }

  private getConainerIndex(containerId: string): number {
    for (let i = 0; i < this.formContainer.length; i++) {
      let id = (this.formContainer.get(i) as any)['_hostLView'][0].firstChild
        .firstChild.firstChild.id;
      //console.log(`id${i}:${id}`);
      if (id === containerId) return i;
    }
    throw `Container Id : ${containerId} is not found`;
  }
}
