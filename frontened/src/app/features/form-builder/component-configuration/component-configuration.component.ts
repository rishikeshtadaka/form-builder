import { Component, Input, OnInit, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormBuilderComponentEventEmitterService } from '@features/form-builder/core/form-builder-component-event-emitter.service';
import { CommonStyleConfigurationComponent } from '../common-style-configuration/common-style-configuration.component';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import { ViewContainerDirective } from '../../../shared/directives/view-container.directive';
import { IBaseElementConfigurationsComponent } from '../element-configurations/ibase-element-configurations.component';
import { FormBuilderComponentRegistryService } from '../core/form-builder-component-registry.service';
import { DrawerService } from '@core/services/drawer.service';
import { MatDialog } from '@angular/material/dialog';
import { VisibilityRulesConfigurationComponent } from '../visibility-rules-configuration/visibility-rules-configuration.component';
import { ValidationRuleConfigurationComponent } from '../validation-rule-configuration/validation-rule-configuration.component';
import { ConditionalLogicDataService } from '@core/services/conditional-logic-data.service';
import { FormJsonModel } from '@core/model/form-json.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';
import { BaseElementConfigurationsComponent } from '../element-configurations/base-element-configurations.component';
import { ValidationRulesConfigurationModel } from '@core/model/validation-configuration.model';
import { ComputationRuleConfigurationComponent } from '../computation-rule-configuration/computation-rule-configuration.component';
import { ComputationConfigurationModel } from '@core/model/computation-configuration.model';
import { FormPreviewComponent } from '../form-preview/form-preview.component';
import { ToastMessageService } from '@core/services/toast-message.service';

@Component({
  selector: 'cs-component-configuration',
  templateUrl: './component-configuration.component.html',
  styleUrls: ['./component-configuration.component.scss']
})
export class ComponentConfigurationComponent
  implements OnInit {

  @ViewChild(ViewContainerDirective, { static: true })
  componentHost!: ViewContainerDirective;

  @ViewChild('commonStyleConfiguration') public commonStyleConfigurationComponent: CommonStyleConfigurationComponent;
  @ViewChild('drawer') public drawer: any;
  @Input() elementConfigurationComponentName: string;
  public formResponseFromFormBuilder: FormJsonModel;
  private baseElementConfigurationsComponent: IBaseElementConfigurationsComponent;
  public labelName: string = 'Text Box';
  public visibilityObject: VisibilityRulesConfigurationModel[] = [];
  public validationObject: ValidationRulesConfigurationModel[] = [];
  public computationObject: ComputationConfigurationModel[] = [];
  step = 0;
  public showConfiguration: boolean = false;

  constructor(private formBuilderSharedComponentService: FormBuilderComponentEventEmitterService,
    private formBuilderDomRegistryService: FormBuilderDomRegistryService,
    private formBuilderComponentRegistryService: FormBuilderComponentRegistryService,
    public dialog: MatDialog,
    private drawerService: DrawerService,
    public conditionalLogicDataService: ConditionalLogicDataService,
    private formBuilderComponentEventEmitterService: FormBuilderComponentEventEmitterService,
    private toastMessageService:ToastMessageService
  ) { }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  openVisibilityDialog() {

    const dialogRef = this.dialog.open(VisibilityRulesConfigurationComponent, {
      data: {currentComponentId: this.formBuilderSharedComponentService.currentConfigurationElementId,
            data: null}
    });

  }

  openVisibilityEditDialog(visibilityRuleId: string) {
    let component = this.formBuilderDomRegistryService.getComponent(this.formBuilderSharedComponentService.currentConfigurationElementId);
    let visObj = component.getVisibility().find(t => t.visibilityRuleId === visibilityRuleId);

    const editDialogRef = this.dialog.open(VisibilityRulesConfigurationComponent, {
      data: {data: visObj,
            currentComponentId: this.formBuilderSharedComponentService.currentConfigurationElementId}
    });

  }
  openValidationEditDialog(validationRuleId: string) {
    let component = this.formBuilderDomRegistryService.getComponent(this.formBuilderSharedComponentService.currentConfigurationElementId);
    let valObj = component.getValidation().find(t => t.validationRuleId === validationRuleId);

    const editDialogRef = this.dialog.open(ValidationRuleConfigurationComponent, {
      data: valObj
    });
  }
  deleteVisibility(visibilityRuleId: string){
    let component = this.formBuilderDomRegistryService.getComponent(this.formBuilderSharedComponentService.currentConfigurationElementId);
    let valObj = component.getVisibility().findIndex(t => t.visibilityRuleId === visibilityRuleId);
    this.visibilityObject.splice(valObj,1);
    component.setVisibility(this.visibilityObject)
  }
  deleteValidation(validationRuleId: string){
    let component = this.formBuilderDomRegistryService.getComponent(this.formBuilderSharedComponentService.currentConfigurationElementId);
    let valObj = component.getValidation().findIndex(t => t.validationRuleId === validationRuleId);
    this.validationObject.splice(valObj,1);
    component.setValidation(this.validationObject)
  }
  deleteComputation(computationRuleId: string){
    let component = this.formBuilderDomRegistryService.getComponent(this.formBuilderSharedComponentService.currentConfigurationElementId);
    let compObj = component.getComputation().findIndex(t => t.computationRuleId === computationRuleId);
    this.computationObject.splice(compObj,1);
    component.setComputation(this.computationObject)
  }
  openValidationDialog() {
    const dialogRef = this.dialog.open(ValidationRuleConfigurationComponent, {});

  }

  openComputationDialog() {
    const dialogRef = this.dialog.open(ComputationRuleConfigurationComponent, {});
  }

  openComputationEditDialog(computationRuleId: string) {
    let component = this.formBuilderDomRegistryService.getComponent(this.formBuilderSharedComponentService.currentConfigurationElementId);
    let computationObj = component.getComputation().find(t => t.computationRuleId === computationRuleId);

    const editDialogRef = this.dialog.open(ComputationRuleConfigurationComponent, {
      data: computationObj
    });
  }

  ngOnInit(): void {
    this.listenEvents();
  }

  private listenEvents(): void {
    this.formBuilderSharedComponentService.listenOpenConfigurations().subscribe(elementId => {
      let c = this.formBuilderDomRegistryService.getComponent(elementId);
      let componentInfo = this.formBuilderComponentRegistryService.getComponent(c.formBuilderComponent.getComponentName());
      this.renderConfigurationComponent(componentInfo.elementConfiguration!);
      let configurations = c.formBuilderComponent.getConfigurations();
      this.visibilityObject = Object.assign([], c.getVisibility());
      this.validationObject = Object.assign([], c.getValidation());
      this.computationObject = Object.assign([], c.getComputation());
      this.baseElementConfigurationsComponent.setConfigurations(configurations);
    });

    this.formBuilderComponentEventEmitterService.listenSetVisibility().subscribe((visibility: VisibilityRulesConfigurationModel) => {
      this.visibilityObject = this.visibilityObject || [];
      let isExisting: boolean = false;
      for (let i = 0; i <= this.visibilityObject.length - 1; i++) {
        let vr = this.visibilityObject[i];
        if (vr.visibilityRuleId === visibility.visibilityRuleId) {
          vr.action = visibility.action;
          vr.expressions = visibility.expressions;
          vr.name = visibility.name;
          isExisting = true;
          break;
        }
      }
      if (!isExisting)
        this.visibilityObject.push(visibility);

    });

    this.formBuilderComponentEventEmitterService.listenSetValidation().subscribe((validation: ValidationRulesConfigurationModel) => {
      this.validationObject = this.validationObject || [];
      let isExisting: boolean = false;
      for (let i = 0; i <= this.validationObject.length - 1; i++) {
        let vr = this.validationObject[i];
        if (vr.validationRuleId === validation.validationRuleId) {
          vr.message = validation.message;
          vr.expressions = validation.expressions;
          vr.name = validation.name;
          isExisting = true;
          break;
        }
      }
      if (!isExisting) {
        this.validationObject.push(validation);
          }
    });
    this.formBuilderComponentEventEmitterService.listenSetComputation().subscribe((computation: ComputationConfigurationModel) => {
      this.computationObject = this.computationObject || [];
      let isExisting: boolean = false;
      for (let i = 0; i <= this.computationObject.length - 1; i++) {
        let vr = this.computationObject[i];
        if (vr.computationRuleId === computation.computationRuleId) {
          vr.description = computation.description;
          vr.firstField = computation.firstField;
          vr.operator = computation.operator;
          vr.secondField = computation.secondField;
          vr.name = computation.name;
          isExisting = true;
          break;
        }
      }
      if (!isExisting) {
        this.computationObject.push(computation);
      }
    });
  }
  closeConfiguration(){
    this.drawerService.close();
  }
  public applyStyles(): void {
    if(this.baseElementConfigurationsComponent.getConfigurations().label){
      this.formBuilderSharedComponentService.emitElementConfigurations(this.baseElementConfigurationsComponent.getConfigurations());
      this.drawerService.close();
    }
    else{
      this.toastMessageService.error("Label Is Required For Validation And Visibility Rules! Enter It And Hide It If You Don't Want To Display.");
    }
  }

  private renderConfigurationComponent(configurationComponent: Type<any>): void {
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();
    this.baseElementConfigurationsComponent = viewContainerRef.createComponent(configurationComponent).instance as IBaseElementConfigurationsComponent;
  }
}