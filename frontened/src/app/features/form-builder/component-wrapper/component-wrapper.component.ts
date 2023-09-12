import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  QueryList,
  Type,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { IFormBuilderComponent } from '@shared/components/base/iform-builder.component';
import { FormBuilderComponentEventEmitterService } from '../core/form-builder-component-event-emitter.service';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import { ViewContainerDirective } from '../../../shared/directives/view-container.directive';
import { ElementJsonModel } from '@core/model/form-json.model';
import { SectionComponent } from '../section/section.component';
import { RowComponent } from '../row/row.component';
import { IFormBuilderContainerComponent } from '../core/iform-builder-container.component';
import { FormBuilderComponentRegistryService } from '../core/form-builder-component-registry.service';
import { FormBuilderComponentEncase } from '../core/form-builder-component-encase';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { DrawerService } from '@core/services/drawer.service';
import { DeleteCollectionPopupComponent } from '@features/dashboard/cs-collections/delete-collection-popup/delete-collection-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponentPopupComponent } from '../delete-component-popup/delete-component-popup.component';

@Component({
  selector: 'cs-component-wrapper',
  templateUrl: './component-wrapper.component.html',
  styleUrls: ['./component-wrapper.component.scss'],
})
export class ComponentWrapperComponent implements OnInit {
  @Input() element: ElementJsonModel;

  public componentId: string;

  @ViewChild(ViewContainerDirective, { static: true })
  componentHost!: ViewContainerDirective;
  private componentInstance: IFormBuilderComponent;  
  public deleteElement:EventEmitter<string>=new EventEmitter<string>();

  constructor(
    private formBuilderComponentEventEmitterService: FormBuilderComponentEventEmitterService,
    private formBuilderDomRegistryService: FormBuilderDomRegistryService,
    private formBuilderComponentRegistryService: FormBuilderComponentRegistryService,
    private drawerService: DrawerService,
    public dialog: MatDialog
  ) {
    this.componentId = this.getUniqueId();
  }

  ngOnInit(): void {
    this.loadComponent();
    this.listenEvents();
  }

  listenEvents(): void {}

  isContainerComponent(component: Type<any>): boolean {
    if (component === SectionComponent || component === RowComponent)
      return true;
    return false;
  }

  loadComponent(): void {
    let component = this.formBuilderComponentRegistryService.getComponent(
      this.element.type
    );
    this.componentId = this.element.id || this.componentId; //To handle create and edit.
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentInstance =
      viewContainerRef.createComponent<IFormBuilderComponent>(
        component.component
      ).instance;
    this.formBuilderDomRegistryService.setComponent(
      this.componentId,
      new FormBuilderComponentEncase(
        this.componentInstance,
        this.element.configurations.visibility,
        this.element.configurations.validation,
        this.element.configurations.computation
      )
    );

    if (this.element.configurations.general)
      this.componentInstance.setConfigurations(
        this.element.configurations.general
      );

    if (this.isContainerComponent(component.component)) {
      let containerComponent = this
        .componentInstance as IFormBuilderContainerComponent;
      containerComponent.elements = this.element.elements;
    }
  }

  private getUniqueId(): string {
    return `CS_Element_${new Date().getTime()}`;
  }

  ngOnDestroy(): void {}

  openOptions(): void {
    this.formBuilderComponentEventEmitterService.emitOpenConfigurations(
      this.componentId
    );
  }
  deleteComponent() {
    const dialogRef = this.dialog.open(DeleteComponentPopupComponent, {
      data: {
        componentId: this.componentId,
      },
    });

    dialogRef.componentInstance.deleteElement.subscribe(()=>{
      this.deleteElement.emit();
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  public moveUp(): void {
    const element = document.getElementById(this.componentId)?.parentElement!;
    if (
      element.previousElementSibling &&
      element.previousElementSibling.tagName.toLowerCase() ===
        FormBuilderComponentConstant.wrapper
    )
      element.parentNode?.insertBefore(element, element.previousElementSibling);
  }

  public moveDown(): void {
    const element = document.getElementById(this.componentId)?.parentElement!;
    if (
      element.nextElementSibling &&
      element.nextElementSibling.tagName.toLowerCase() ===
        FormBuilderComponentConstant.wrapper
    )
      element.parentNode?.insertBefore(element.nextElementSibling, element);
  }
}
