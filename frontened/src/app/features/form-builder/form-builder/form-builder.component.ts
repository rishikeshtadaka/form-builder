import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  AfterContentChecked
} from '@angular/core';
import { BaseComponent } from '@features/common-features/base-components/base.component';
import { FormBuilderComponentRegistryService } from '../core/form-builder-component-registry.service';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import { ComponentWrapperComponent } from '../component-wrapper/component-wrapper.component';
import { FormBuilderComponentEventEmitterService } from '../core/form-builder-component-event-emitter.service';
import { FormJsonBuilder } from '../core/form-json-builder';
import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { JsonUtil } from '@shared/utils/json-util';
import { FormRendererApiService } from '@core/services/form-renderer-api.service';
import { ElementJsonModel, FormJsonModel } from '@core/model/form-json.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilderApiService } from '@core/services/form-builder-api.service';
import { DrawerService } from '@core/services/drawer.service';
import { LoaderService } from '@core/services/loader.service';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { ViewContainerDirective } from '@shared/directives/view-container.directive';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormPreviewComponent } from '../form-preview/form-preview.component';
import { SidenavService } from '@shared/services/sidenav.service';
import { MatDrawer } from '@angular/material/sidenav';
import { ToastMessageService } from '@core/services/toast-message.service';
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent
  extends BaseComponent
  implements OnInit, AfterViewInit {
  private draggingElementIdLiteral: string = 'draggingElementId';
  private moveEventName: string = 'move';
  @ViewChild(ViewContainerDirective, { static: true }) componentHost!: ViewContainerDirective;

  public formName: string = 'Form Name';
  public formJsonModel: FormJsonModel;
  public elementJsonModel: ElementJsonModel[] = [];
  public formId: string;
  public collectionId: string;
  public isLoading: boolean = false;
  public isUpdate: boolean;

  @ViewChild('drawer') public drawer: any;
  @ViewChild('drawer1') public drawer1: MatDrawer;

  constructor(
    injector: Injector,
    private formBuilderComponentRegistryService: FormBuilderComponentRegistryService,
    private formBuilderDomRegistryService: FormBuilderDomRegistryService,
    private formBuilderComponentEventEmitterService: FormBuilderComponentEventEmitterService,
    private formBuilderSharedComponentService: FormBuilderComponentEventEmitterService,
    private formJsonBuilder: FormJsonBuilder,
    private formRendererApiService: FormRendererApiService,
    private route: ActivatedRoute,
    private formBuilderApiService: FormBuilderApiService,
    private drawerService: DrawerService,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private loaderService: LoaderService,
    public dialog: MatDialog,
    public sideNavService: SidenavService,
    private toastMessageService:ToastMessageService
  ) {
    super(injector);
  }
  ngAfterViewInit(): void {
    this.sideNavService.setDrawer(this.drawer1);
    this.formId = this.route.snapshot.params['formId'];
    this.collectionId = this.route.snapshot.params['collectionId'];
    this.isUpdate = (this.formId && this.collectionId) ? true : false;
    // this.formRendererApiService.setCollectionAndFormsId(this.collectionId,this.formId);
    if (this.formId && this.collectionId) {
      this.loadFormJson();
      
    }
  }

  public ngOnInit(): void {

    this.listenEvents();
  }

  listenEvents(): void {
    this.formBuilderSharedComponentService
      .listenOpenConfigurations()
      .subscribe((t) => {
        // this.drawer.open();
        this.drawerService.setSidenav(this.drawer);
        this.drawerService.open();
      });
                                  
    this.formBuilderComponentEventEmitterService
      .listenElementConfigurations()
      .subscribe((elementConfigurations) => {
        let component = this.formBuilderDomRegistryService.getComponent(
          this.formBuilderComponentEventEmitterService
            .currentConfigurationElementId
        );
        component.formBuilderComponent.setConfigurations(elementConfigurations);
      });
    this.formBuilderComponentEventEmitterService
      .listenSetVisibility()
      .subscribe((visibility) => {

        let component = this.formBuilderDomRegistryService.getComponent(
          this.formBuilderComponentEventEmitterService
            .currentConfigurationElementId
        );
        component.pushOrUpdateVisibility(visibility);
      });
    this.formBuilderComponentEventEmitterService.listenSetValidation()
      .subscribe((validation) => {
        let component = this.formBuilderDomRegistryService.getComponent(
          this.formBuilderComponentEventEmitterService
            .currentConfigurationElementId
        );
        component.pushOrUpdateValidation(validation);
      })
    this.formBuilderComponentEventEmitterService.listenSetComputation()
      .subscribe((computation) => {
        let component = this.formBuilderDomRegistryService.getComponent(
          this.formBuilderComponentEventEmitterService
            .currentConfigurationElementId
        );
        component.pushOrUpdateComputation(computation);
      })
  }


  public dragoverHandler(ev: any): void {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = this.moveEventName;
  }

  public dropHandler(ev: any): void {
    ev.preventDefault();
    const elementId = ev.dataTransfer.getData(this.draggingElementIdLiteral);
    const viewContainerRef = this.componentHost.viewContainerRef;
    let wrapperComponent = viewContainerRef?.createComponent(
      ComponentWrapperComponent
    ).instance!;
    wrapperComponent.element = ElementJsonModel.getElementWithType(elementId);
  }

  public save(): void {
    this.loaderService.setLoader(true);
    let json = this.formJsonBuilder.build(this.formName, '');
    
    if (!this.isUpdate) {
      this.formBuilderApiService
        .saveForm(this.collectionId, json)
        .subscribe((response: any) => {
          this.loaderService.setLoader(false);
          this.toastMessageService.success('Form Saved Successfully');

        },
      (error) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed To Save Form!');
      });
    }
    else if (this.isUpdate) {
      this.isLoading = true;
      this.formBuilderApiService
        .updateForm(this.collectionId, this.formId, json)
        .subscribe((response: any) => {
          this.loaderService.setLoader(false);
          this.toastMessageService.success('Form Updated Successfully!');
        },
        (error) => {
          this.loaderService.setLoader(false);
          this.toastMessageService.error('Failed To Update Form!');
        }
        );
    }
    setTimeout(() => {
      
      this.router.navigateByUrl(`collections/${this.collectionId}`);
    }, 2000);
  }

  goToForms(){
    this.router.navigateByUrl(`collections/${this.collectionId}`);
  }
  showFiller = false;

  renderContainer(element: ElementJsonModel): void {
    const viewContainerRef = this.componentHost.viewContainerRef;
    let wrapperComponent = viewContainerRef?.createComponent(
      ComponentWrapperComponent
    ).instance!;
    wrapperComponent.element = element;
  }

  private renderElements(): void {
    for (let i = 0; i < this.formJsonModel.elements?.length; i++) {
      let element = this.formJsonModel.elements[i];
      this.renderContainer(element);
    }
  }

  private loadFormJson(): void {
    this.loaderService.setLoader(true);
    this.formBuilderApiService
      .getFormById(this.collectionId, this.formId)
      .subscribe((response: FormJsonModel) => {
        this.formJsonModel = response;
        this.formName = this.formJsonModel.name;
        this.renderElements();
        this.loaderService.setLoader(false);
        // this.toastMessageService.success('Form Fetched Successfully')
      },
      (error) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed To Fetch Form!')
      });
  }
  ngOnDestroy() {
    this.formBuilderDomRegistryService.reset();
  }
  public prependSection(): void {
    const viewContainerRef = this.componentHost.viewContainerRef;
    let wrapperComponent = viewContainerRef?.createComponent(
      ComponentWrapperComponent, { index: 0 }
    ).instance!;
    wrapperComponent.element = ElementJsonModel.getElementWithType(FormBuilderComponentConstant.section);
  }

  public appendSection(): void {
    const viewContainerRef = this.componentHost.viewContainerRef;
    let wrapperComponent = viewContainerRef?.createComponent(
      ComponentWrapperComponent
    ).instance!;
    wrapperComponent.element = ElementJsonModel.getElementWithType(FormBuilderComponentConstant.section);
  }

  openPreviewDialog() {
    let json = this.formJsonBuilder.build(this.formName, '');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '98vw';
    dialogConfig.panelClass = 'full-screen-modal';
    dialogConfig.maxWidth= '98vw';
    dialogConfig.maxHeight='95vh';
    dialogConfig.position = {
      top: '15px',
      right: '10px'
    };

    // set form data
    dialogConfig.data =json;

    const editDialogRef = this.dialog.open(FormPreviewComponent, dialogConfig);

    editDialogRef.afterClosed().subscribe(result => {
    });
  }
}
