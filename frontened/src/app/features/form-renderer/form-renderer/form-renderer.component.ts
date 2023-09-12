import { ChangeDetectorRef, Component, DoCheck, ElementRef, HostListener, OnInit, QueryList, Renderer2, Type, ViewChild, ViewChildren, inject } from '@angular/core';
import {
  ElementJsonModel,
  ElementResponseJsonModel,
  FormJsonModel,
  FormResponseJsonModel,
} from '@core/model/form-json.model';
import { FormRendererApiService } from '@core/services/form-renderer-api.service';
import { FormBuilderComponentRegistryService } from '@features/form-builder/core/form-builder-component-registry.service';
import { ViewContainerDirective } from '@shared/directives/view-container.directive';
import { IFormBuilderComponent } from '@shared/components/base/iform-builder.component';
import { FormBuilderComponentConstant } from '@shared/static/form-builder-component.constant';
import { IContainerRendereComponent } from '../icontainer-renderer.component';
import { RowRendererComponent } from '../row-renderer/row-renderer.component';
import { SectionRendererComponent } from '../section-renderer/section-renderer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormBuilderDomRegistryService } from '@features/form-builder/core/form-builder-dom-registry.service';
import { CollectionsApiService } from '@core/services/collections-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilderComponentEncase } from '@features/form-builder/core/form-builder-component-encase';
import { LoaderService } from '@core/services/loader.service';
import {
  FormResponseModel,
  FormResponseWrapperModel,
} from '@core/model/form-response.model';
import { filter, find, findIndex, get, isArray } from "lodash";
import { ANDing, ORing } from '@shared/utils/util';
import { ExpressionModel, ValidationRulesConfigurationModel } from '@core/model/validation-configuration.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';
import { ComputationConfigurationModel } from '@core/model/computation-configuration.model';
import { CollectionModel, emptyCollectionObj } from '@shared/view-models/collections.model';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from '@shared/services/sidenav.service';
import { ToastMessageService } from '@core/services/toast-message.service';
import { CONDITIONS, evaluteExpression, getConditionString, getTotalElementsFromTree } from '@shared/utils/core-util';
import { environment } from '@environments/environment';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';

declare var $: any;

interface CsDom {
  componentName: string;
  childrens: CsDom[];
}

@Component({
  selector: 'cs-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss'],
})
export class FormRendererComponent implements OnInit, DoCheck {
  public formJsonModel: FormResponseJsonModel;
  @ViewChild('drawer1') public drawer1: MatDrawer;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  public formValues: any;
  public formResponse: FormResponseModel[] = [];
  public formArr: any;
  public requestId: any;
  public isUpdate: boolean;
  public requestData: any;
  public formsId: string;
  public currentFormIndex: number = 0;
  public elementMaplist: any[] = [];
  public requestedForm: FormJsonModel;
  public totalElements: number = 0;

  @ViewChild(ViewContainerDirective, { static: true })
  componentHost!: ViewContainerDirective;
  isLinear = true;
  firstRender = true;
  showNavButtons = false;
  collection: CollectionModel = emptyCollectionObj;
  isReadOnly: Boolean = false;
  customStyle: any = {
    fontFamily: null,
    backgroundColor: null
  };
  public mode: any;
  private lookUpAPICall: any = null;
  public lastEvent: any = { id: null, value: null }
  formNavigation: any[] = [{
    title: 'Submit',
    isSubmit: true,
    index: 0
  }];
  requiredElements: any[] = [];

  constructor(
    private formBuilderComponentRegistryService: FormBuilderComponentRegistryService,
    private formRendererApiService: FormRendererApiService,
    public formBuilderDomRegistryService: FormBuilderDomRegistryService,
    private collectionApiService: CollectionsApiService,
    public loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    public sideNavService: SidenavService,
    private toastMessageService: ToastMessageService,
    public dialog: MatDialog
  ) {
    this.loaderService.setNoDataTemplate(false);
    this.formJsonModel = new FormResponseJsonModel('', '');
    this.formBuilderDomRegistryService.reset();
  }

  ngDoCheck(): void {
    if (this.firstRender && this.formBuilderDomRegistryService.getAllComponents().size >= this.totalElements && this.totalElements > 0) {
      this.firstRender = false;
      this.setVisibilityOnLoad(this.requestedForm);
    }
  }

  ngOnInit(): void {
    this.mode = environment.mode;
    this.requestId = this.route.snapshot.params['requestId'];
    this.loadFormJson();
    // this.loaderService.setLoader(false);
  }
  ngAfterViewInit(): void {
    this.sideNavService.setDrawer(this.drawer1);
  }

  renderContainer(
    element: ElementResponseJsonModel,
    component: Type<any>
  ): void {
    //TODO: add admin-user logic
    const viewContainerRef = this.componentHost.viewContainerRef;
    let containerComponent =
      viewContainerRef?.createComponent<IContainerRendereComponent>(component)
        .instance!;

    if (this.mode == 'ADMIN') {
      if (this.requestData.status == 'Submitted-Customer' || this.requestData.status == 'In Progress') {
        this.isReadOnly = false;
        if (!element.configurations.general.internal) {
          element.configurations.general.disable = true;
          element.elements.forEach(element => {
            element.configurations.general.disable = true;
          });
        }
        else {
          element.configurations.general.disable = false;
          element.elements.forEach(element => {
            element.configurations.general.disable = false;
          })
        }
      }
      if (this.requestData.status == 'Submitted') {
        if (!element.configurations.general.internal || element.configurations.general.internal) {
          element.configurations.general.disable = true;
          element.elements.forEach(element => {
            element.configurations.general.disable = true;
          });
        }
        else {
          element.configurations.general.disable = false;
          element.elements.forEach(element => {
            element.configurations.general.disable = false;
          });
        }

      }
    }

    if (this.mode == 'CUSTOMER') {
      if (this.requestData.status == 'Submitted-Customer' || this.requestData.status == 'Submitted' || this.requestData.status == 'In Progress') {
        element.configurations.general.disable = true;
        element.elements.forEach(element => {
          element.configurations.general.disable = true;
        });
      }
      else if (this.requestData.status !== 'Submitted-Customer' || this.requestData.status !== 'Submitted' || this.requestData.status !== 'In Progress') {
        if (element.configurations.general.internal) {
          element.configurations.general.disable = true;
          element.visible = false;

          element.elements.forEach(element => {
            element.configurations.general.disable = true;
          });
        }
        else {
          element.configurations.general.disable = false;
          element.elements.forEach(element => {
            element.configurations.general.disable = false;
          });
        }
      }
    }

    containerComponent.elements = element.elements;
    this.formBuilderDomRegistryService.setComponent(Math.random().toString(), new FormBuilderComponentEncase(containerComponent as any));
    containerComponent.setConfigurations(element.configurations.general)
    // if (this.isReadOnly) {
    //   element.configurations.general.disable = true;
    // }
    containerComponent.setValue(element.value);
    containerComponent.setId(element.id);
    containerComponent.setValid(true);
    containerComponent.setVisibility(element.visible);
    containerComponent.setConfigurations(element.configurations.general);
    containerComponent.setVisibilityConfigurations(element.configurations.visibility);
    containerComponent.setValidityConfigurations(element.configurations.validation);
  }

  protected renderElement(element: ElementResponseJsonModel): void {
    if (element.type === FormBuilderComponentConstant.row) {
      this.renderContainer(element, RowRendererComponent);
      return;
    }
    if (element.type === FormBuilderComponentConstant.section) {
      this.renderContainer(element, SectionRendererComponent);
      return;
    }
    const viewContainerRef = this.componentHost.viewContainerRef;
    let e = this.formBuilderComponentRegistryService.getComponent(element.type);
    let newlyCreatedComponent =
      viewContainerRef?.createComponent<IFormBuilderComponent>(e.component)
        .instance!;
    this.formBuilderDomRegistryService.setComponent(Math.random().toString(), new FormBuilderComponentEncase(newlyCreatedComponent));
    if (this.isReadOnly) {
      element.configurations.general.disable = true;
    }
    newlyCreatedComponent.setValue(element.value);
    newlyCreatedComponent.setId(element.id);
    newlyCreatedComponent.setVisibility(element.visible);
    newlyCreatedComponent.setConfigurations(element.configurations.general);
    newlyCreatedComponent.setVisibilityConfigurations(element.configurations.visibility);
    newlyCreatedComponent.setValidityConfigurations(element.configurations.validation);
  }

  private renderElements(): void {
    for (let i = 0; i < this.formJsonModel.elements.length; i++) {
      let element = this.formJsonModel.elements[i];
      this.renderElement(element);
    }
  }

  private getValue(elementName: string): any {
    if (this.formResponse) {
      for (let i = 0; i < this.formResponse.length; i++) {
        let response = this.formResponse[i];
        if (response.name === elementName) return response.value;
      }
      return null;
    } else {
      return null;
    }
  }

  private setElementValue(elements: ElementJsonModel[]): void {
    if (!elements) return;
    if (elements.length === 0) return;

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      (element as any)['value'] = this.getValue(
        element.configurations.general.name
      );

      this.elementMaplist.push({
        name: element.configurations.general.name,
        id: element.id
      });
      this.setElementValue(element.elements);
    }
  }

  public renderForm(formId: string): void {
    this.loaderService.setLoader(true)
    this.elementMaplist = [];
    // set current form index
    let currentIndex = findIndex(this.requestData?.forms, { id: formId });
    if (currentIndex != -1) {
      this.currentFormIndex = currentIndex;
    }
    this.componentHost.viewContainerRef.clear();
    this.formBuilderDomRegistryService.reset();
    this.loaderService.setNoDataTemplate(false);
    this.formRendererApiService
      .getFormById(this.requestData.collectionId, formId)
      .subscribe((form: FormJsonModel) => {
        this.firstRender = true;
        this.requestedForm = form;

        this.totalElements = getTotalElementsFromTree(form.elements).length || 0;
        this.setElementValue(form.elements);
        this.formJsonModel = form as FormResponseJsonModel;
        this.renderElements();
        this.showNavButtons = true;
        this.loaderService.setLoader(false);
      },
        (error: any) => {
          this.loaderService.setLoader(false);
          this.toastMessageService.error('Failed To Render Form!');
        });
  }

  private loadFormJson(loadFirstForm: boolean = true): void {
    this.loaderService.setLoader(true);
    this.loaderService.setNoDataTemplate(false);
    this.formRendererApiService.getRequestById(this.requestId).subscribe((request: FormResponseWrapperModel) => {
      this.requestData = request.result;
      this.loaderService.setLoader(false);
      this.formResponse = this.requestData.responses || [];
      let formNavs: any[] = [];

      if (request.result.status && ['Submitted', 'Submitted-Customer'].includes(request.result.status)) {
        this.isReadOnly = true;
      }

      if (loadFirstForm && this.requestData.forms) {
        this.requestData.forms.forEach((form: any, index: number) => {
          formNavs.push({
            title: form.name,
            id: form.id,
            index: index
          })
        });
        this.renderForm(this.requestData.forms[0].id);
        this.getCollectionDetails(request.result?.collectionId)
        // if read only then remove submit stage
        this.formNavigation = this.isReadOnly ? [...formNavs] : [...formNavs, ...this.formNavigation];
      }
      else {
        this.loaderService.setNoDataTemplate(true);
      }

      // if (this.mode=='ADMIN'&& request.result.status && ['Submitted-Customer'].includes(request.result.status)) {
      //     this.isReadOnly = false;
      //   }

    },
      (error) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed!');
      })
  }

  getCollectionDetails(collectionId: string) {
    this.collectionApiService.getCollectionById(collectionId).subscribe((collection: any) => {
      if (collection.result) {
        if (collection.result?.fontFamily) this.customStyle.fontFamily = collection.result.fontFamily
        if (collection.result?.backgroundColor) this.customStyle.backgroundColor = collection.result.backgroundColor
        this.collection = collection.result;
      }
    },
      (error) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed!');
      })
  }

  onSave(nextForm?: any) {
    let responseArr: { name: any; value: any }[] = this.formResponse;
    let loadedComponents =
      this.formBuilderDomRegistryService.getAllComponents();
    loadedComponents.forEach((element: FormBuilderComponentEncase) => {
      const docIndex = findIndex(responseArr, { name: element.formBuilderComponent.getConfigurations().name });
      let elemValue = element.formBuilderComponent.getValue() || '';
      if (docIndex >= 0) {
        responseArr[docIndex].value = elemValue.toString();
      }
      else if (element.formBuilderComponent.getConfigurations().name) {
        responseArr.push({
          name: element.formBuilderComponent.getConfigurations().name,
          value: elemValue.toString(),
        });
      }
    });

    let payload = {
      collectionId: this.requestData.collectionId,
      forms: this.requestData.forms,
      responses: responseArr,
    } as any;

    // on submit
    if (!nextForm) {
      payload.status = this.mode == 'ADMIN' ? 'Submitted' : 'Submitted-Customer';
    }
    else {
      payload.status = this.mode == 'ADMIN' ? 'In Progress' : 'In Progress-Customer';
    }
    this.formRendererApiService
      .updateResponse(this.requestId, payload)
      .subscribe((response: any) => {
        this.loadFormJson(false);
        if (nextForm) {
          this.renderForm(nextForm.id);
        }
        else {
          this.loaderService.setLoader(false);
          this.toastMessageService.success('Form Submitted Successfully!')
          if (environment.mode === 'ADMIN') {
            this.router.navigateByUrl(`form-renderer/responses`);
          } else {
            this.router.navigateByUrl(`form-renderer/requests`);
          }

        }
      },
        (error: any) => {
          this.loaderService.setLoader(false);
          this.toastMessageService.error('Failed!');
        });
  }
  goToPreviousForm(previousForm: any) {
    this.renderForm(previousForm.id);
    this.loadFormJson(false);
  }

  checkCondition(expression: ExpressionModel, value: string) {
    let isChecked = false;
    if (expression.operator?.toLowerCase() == 'gt') {
      isChecked = value > expression.value;
    } else if (expression.operator?.toLowerCase() == 'lt') {
      isChecked = value < expression.value;
    }
    if (expression.operator?.toLowerCase() == 'gte' || expression.operator?.toLowerCase() == 'gtoet') {
      isChecked = value >= expression.value;
    } else if (expression.operator?.toLowerCase() == 'lte' || expression.operator?.toLowerCase() == 'ltoet') {
      isChecked = value <= expression.value;
    }
    else if (expression.operator?.toLowerCase() == 'eq' || expression.operator?.toLowerCase() == 'et') {
      isChecked = value == expression.value;
    }
    return isChecked
  }

  private getValueByElementId(elementId: any): any {
    const elementMap = find(this.elementMaplist, { id: elementId });
    let elementName = '';
    if (elementMap) {
      elementName = elementMap.name;
    }

    let arr = this.formBuilderDomRegistryService.getAllComponents();

    let value = null;
    arr.forEach(element => {
      if (element.formBuilderComponent.getId() == elementId) {
        value = element.formBuilderComponent.getValue();
      }
    });

    return value;
  }

  setVisibilityOnLoad(element: FormJsonModel | ElementJsonModel) {
    if (element.configurations && element.configurations.visibility && element.configurations.visibility.length > 0) {
      if (element.configurations.visibility[0].expressions && element.configurations.visibility[0].expressions.length > 0) {
        const expressionArr = element.configurations.visibility[0].expressions || [];
        let isConditionTrue = false;
        let targetIdValue = '';

        // lookup check
        if (expressionArr.length > 0 && expressionArr[0].lookup && expressionArr[0].lookup?.trim().length > 0) {
          let url = expressionArr[0].lookup;
          let value = this.getValueByElementId(expressionArr[0].sourceElementId);;
          if (url && url.indexOf('{fieldValue}') != -1) {
            if (value == 'Yes' || value == '1' || value == 'YES' || value == 'yes') {
              url = url.replace('{fieldValue}', 'true');
            } else if (value == 'No' || value == '0' || value == 'NO' || value == 'no') {
              url = url.replace('{fieldValue}', 'false');
            } else {
              url = url.replace('{fieldValue}', value);
            }
          }
          this.formRendererApiService.apiCall(url).subscribe((response: any) => {
            isConditionTrue = this.checkCondition(expressionArr[0], response)
            this.checkAndSetShowOrHide(response, element);
          });
          return;
        }

        // check all expressions
        isConditionTrue = this.validateExpressions(expressionArr);

        this.checkAndSetShowOrHide(isConditionTrue, element);
      }

    }
    if (element.elements) {
      element.elements.forEach(subElement => {
        this.setVisibilityOnLoad(subElement);
      });
    }
  }

  @HostListener('change', ['$event'])
  @HostListener("window:DropDownChange", ["$event", "$event.detail"])
  @HostListener('input', ['$event'])
  public onChange(event: any, args: any): void {
    if (args) {
      event = args;
    }
    const value = (event.target as HTMLInputElement).value;
    const eleName = event?.target?.getAttribute('ng-reflect-name') || event?.target?.getAttribute('name');
    if (eleName) {
      const doc = find(this.elementMaplist, { name: eleName });
      if (doc && doc.id) {
        if (this.lastEvent.id == doc.id && this.lastEvent.value == value) {
          return;
        }
        this.lastEvent = {
          id: doc.id,
          value: value
        }
        this.requestedForm.elements.forEach(element => {
          this.setVisibitlity(doc, value, element);
          this.setSiblingValue(doc, value, element);
          this.setComputationValues(doc.id, value, element);
          this.checkLookUp(doc, value, element);
        });
      }
    }
  }

  setSiblingValue(doc: any, value: string, _element: ElementJsonModel) {
    if (_element.configurations.general?.name == doc.name && doc.id != _element.id) {
      this.setValue(_element.id, value);
    }
    if (_element.elements && _element.elements.length > 0) {
      _element.elements.forEach(element => {
        this.setSiblingValue(doc, value, element)
      });
    }
  }

  setVisibitlity(doc: any, value: string, _element: ElementJsonModel) {
    if (_element.configurations.visibility && _element.configurations.visibility?.length > 0) {
      let expressionArr: any[] = [];

      // check if current element present in visibility rule
      if (JSON.stringify(_element.configurations.visibility[0].expressions).indexOf(`"sourceElementId":"${doc.id}"`) != -1) {
        // if element found in other element's visibility then take all expressions to test
        expressionArr = _element.configurations.visibility[0].expressions;
        let isConditionTrue = false;
        let targetIdValue = '';

        // lookup check
        if (expressionArr.length > 0 && expressionArr[0].lookup && expressionArr[0].lookup?.trim().length > 0) {
          let url = expressionArr[0].lookup;
          if (url && url.indexOf('{fieldValue}') != -1) {
            if (value == 'Yes' || value == '1' || value == 'YES' || value == 'yes') {
              url = url.replace('{fieldValue}', true);
            } else if (value == 'No' || value == '0' || value == 'NO' || value == 'no') {
              url = url.replace('{fieldValue}', false);
            } else {
              url = url.replace('{fieldValue}', value);
            }
          }
          this.formRendererApiService.apiCall(url).subscribe((response: any) => {
            isConditionTrue = this.checkCondition(expressionArr[0], response)
            this.checkAndSetShowOrHide(response, _element);
          });
          return;
        }

        // check all expressions
        isConditionTrue = this.validateExpressions(expressionArr, doc.id, value);

        this.checkAndSetShowOrHide(isConditionTrue, _element);
      }
    }
    if (_element.elements && _element.elements.length > 0) {
      _element.elements.forEach(element => {
        this.setVisibitlity(doc, value, element)
      });
    }
  }

  checkAndSetShowOrHide(isConditionTrue: Boolean, _element: FormJsonModel | ElementJsonModel) {
    if (!_element.configurations.visibility) {
      return;
    }
    if (isConditionTrue) {
      if (_element.configurations.visibility[0].action == 'show') {
        this.setVisibleValue(_element.configurations.visibility[0].elementId, true)
      }
      if (_element.configurations.visibility[0].action == 'hide') {
        this.setVisibleValue(_element.configurations.visibility[0].elementId, false)
      }
    }
    else {
      if (_element.configurations.visibility[0].action == 'show') {
        this.setVisibleValue(_element.configurations.visibility[0].elementId, false)
      }
      if (_element.configurations.visibility[0].action == 'hide') {
        this.setVisibleValue(_element.configurations.visibility[0].elementId, true)
      }
    }
  }

  setVisibleValue(id: String, value: Boolean) {
    let formArr = this.formBuilderDomRegistryService.getAllComponents();
    formArr.forEach(element => {
      if (element.formBuilderComponent.getId() == id) {
        element.formBuilderComponent.setVisibility(value);
      }
    });
  }

  setComputationValues(id: string, value: string, _element: ElementJsonModel) {
    if (_element.configurations.computation && _element.configurations.computation?.length > 0) {
      let sumArray: any[] = [];
      let subArray: any[] = [];
      let expressionArr: ComputationConfigurationModel[] = [];

      _element.configurations.computation.forEach(expression => {
        if (expression.firstField == id || expression.secondField == id) {
          expressionArr.push(expression);
        }
      });

      if (expressionArr && expressionArr.length > 0) {
        let isConditionTrue = 0;
        expressionArr.forEach(expression => {
          let targetIdValue1 = (expression.firstField == id) ? value : this.getValueByElementId(expression.firstField);
          let targetIdValue2 = (expression.secondField == id) ? value : this.getValueByElementId(expression.secondField);
          if (expression.operator?.toLowerCase() == 'plus') {
            if (!isNaN(targetIdValue1) && !isNaN(targetIdValue2)) {
              isConditionTrue = (+targetIdValue1) + (+targetIdValue2)
            }
            else if (!isNaN(targetIdValue1) || !isNaN(targetIdValue2)) {
              isConditionTrue = !isNaN(targetIdValue1) ? +targetIdValue1 : +targetIdValue2
            }
          } else if (expression.operator?.toLowerCase() == 'minus') {
            if (!isNaN(targetIdValue1) && !isNaN(targetIdValue2)) {
              isConditionTrue = (+targetIdValue1) - (+targetIdValue2);
            }
            else if (!isNaN(targetIdValue1) || !isNaN(targetIdValue2)) {
              isConditionTrue = !isNaN(targetIdValue1) ? +targetIdValue1 : +targetIdValue2
            }
          }
        });

        this.setValue(_element.id, isConditionTrue)
      }
    }
    if (_element.elements && _element.elements.length > 0) {
      _element.elements.forEach(element => {
        this.setComputationValues(id, value, element)
      });
    }
  }

  setValue(id: String, value: any) {
    let formArr = this.formBuilderDomRegistryService.getAllComponents();
    formArr.forEach(element => {
      if (element.formBuilderComponent.getId() == id) {
        element.formBuilderComponent.setValue(value);
      }
    });
  }

  validateForm(): Boolean {
    let isValidAll = true;
    let formArr = this.formBuilderDomRegistryService.getAllComponents();
    this.requiredElements = [];
    formArr.forEach(element => {
      let elementError = false;
      let config = element.formBuilderComponent.getConfigurations();
      let validityConfig: ValidationRulesConfigurationModel[] = element.formBuilderComponent.getValidityConfigurations();

      if (validityConfig && validityConfig.length > 0) {
        if (validityConfig[0].expressions && validityConfig[0].expressions.length > 0) {
          // check all expressions
          let isConditionTrue = this.validateExpressions(validityConfig[0].expressions);

          if (isConditionTrue && validityConfig[0].message) {

            let elemValue = element.formBuilderComponent.getValue() || '';
        if (elemValue == undefined || !elemValue) {
          
          isValidAll = false;
          elementError = true;
          element.formBuilderComponent.setError(validityConfig[0].message);
          this.requiredElements.push({
            label: config.label,
            error: validityConfig[0].message
          })
        }

          }
        }
      }


      if ((config.maximum || config.minimum) && element.formBuilderComponent.isVisible()) {
        let elemValue = element.formBuilderComponent.getValue() || '';
        if (+elemValue > +config.maximum || +elemValue < +config.minimum) {
          isValidAll = false;
          elementError = true;
          let error = `Value should be inbetween ${config.minimum} - ${config.maximum}`;
          element.formBuilderComponent.setError(error)
          this.requiredElements.push({
            label: config.label,
            error: error
          })
        }
      }

      if (config.charachterLength && element.formBuilderComponent.isVisible()) {
        let elemValue = element.formBuilderComponent.getValue() || '';
        if (elemValue.length > config.charachterLength) {
          isValidAll = false;
          elementError = true;
          let error = `Max char limit is ${config.charachterLength}`;
          element.formBuilderComponent.setError(error)
          this.requiredElements.push({
            label: config.label,
            error: error
          })
        }
      }

      if (!element.formBuilderComponent.isValid() && element.formBuilderComponent.isVisible()) {
        isValidAll = false;
        elementError = true;
        let error = `Invalid: Please provide valid details`;
        element.formBuilderComponent.setError(error)
        this.requiredElements.push({
          label: config.label,
          error: error
        })
      }

      if ((config.required == true || config.required == 'true') && element.formBuilderComponent.isVisible()) {
        let elemValue = element.formBuilderComponent.getValue() || '';
        if (elemValue == undefined || !elemValue) {
          isValidAll = false;
          elementError = true;
          let error = `Required`;
          element.formBuilderComponent.setError(error)
          this.requiredElements.push({
            label: config.label,
            error: error
          })
        }
      }

      if (!elementError) {
        // reset error if there elemt is valid only
        element.formBuilderComponent.setError(``)
      }
    });
    return isValidAll;
  }

  checkLookUp(doc: any, value: any, _element: ElementJsonModel) {
    if (_element.id == doc.id) {
      // set first true to remove old error
      this.setElementValid(doc.id, true, '');

      // lookup check
      if (_element.configurations.general?.lookup && _element.configurations.general?.lookup?.trim().length > 0) {
        this.setElementValid(doc.id, false); // set invalid first
        this.setAutoOptions(_element, []); // reset values
        this.setLoading(doc.id, true) // set loading true
        let url = _element.configurations.general.lookup;
        if (url && url.indexOf('{fieldValue}') != -1) {
          url = url.replace('{fieldValue}', value);
        }
        if (this.lookUpAPICall) {
          this.lookUpAPICall.unsubscribe();
        }
        this.lookUpAPICall = this.formRendererApiService.apiCall(url).subscribe((response: any) => {
          this.lookUpAPICall = null;
          let values = [];
          if (_element.configurations.general && _element.configurations.general.responseMapping?.trim() != '') {
            if (response && response.length > 0) {
              response.forEach((item: any) => {
                if (get(item, `${_element.configurations.general.responseMapping}`)) {
                  values.push(get(item, `${_element.configurations.general.responseMapping}`))
                }
              });
            }
          }
          else {
            values = response || [];
          }
          this.setLoading(doc.id, false) // set loading false
          this.setAutoOptions(_element, values); // set options
        }, (err) => {
          this.setLoading(doc.id, false) // set loading false
          this.setAutoOptions(_element, []); // set options
        });
        return;
      }

      // regex or pattern check
      if (value && (_element.configurations.general?.pattern || _element.configurations.general?.regex)) {
        let regexVal = _element.configurations.general?.pattern || _element.configurations.general?.regex;
        if (regexVal && regexVal?.trim().length > 0) {
          let regex = new RegExp(regexVal);
          if (!value.match(regex)) {
            this.setElementValid(doc.id, false, `${_element.configurations.general.label} should match with regex ${regex}`);
            return;
          }
        }
      }

      // maximun number check
      if (_element.configurations.general?.maximum) {
        if (+value > +_element.configurations.general?.maximum) {
          this.setElementValid(doc.id, false, `${_element.configurations.general.label} should be maximum ${_element.configurations.general?.maximum}`);
          return;
        }
      }

      // minimun no check
      if (_element.configurations.general?.minimum) {
        if (+value < +_element.configurations.general?.minimum) {
          this.setElementValid(doc.id, false, `${_element.configurations.general.label} should be minimum ${_element.configurations.general?.minimum}`);
          return;
        }
      }

      // max lenght char check
      if (_element.configurations.general?.minimumLength) {
        if (value.length < +_element.configurations.general?.minimumLength) {
          this.setElementValid(doc.id, false, `${_element.configurations.general.label} should be minimum length ${_element.configurations.general?.minimumLength}`);
          return;
        }
      }

      // min lenght char check
      if (_element.configurations.general?.maximumLength) {
        if (value.length > +_element.configurations.general?.maximumLength) {
          this.setElementValid(doc.id, false, `${_element.configurations.general.label} should be maximum length ${_element.configurations.general?.maximumLength}`);
          return;
        }
      }

      // required check
      if (_element.configurations.general?.required && (_element.configurations.general?.required == 'true' || _element.configurations.general?.required)) {
        if (!value || (value && (typeof value == 'string' ? value?.trim() : value).length == 0)) {
          this.setElementValid(doc.id, false, `${_element.configurations.general.label} required`);
          return;
        }
      }

      this.setElementValid(doc.id, true, '');
    }
    if (_element.elements && _element.elements.length > 0) {
      _element.elements.forEach(element => {
        this.checkLookUp(doc, value, element)
      });
    }
  }

  setElementValid(id: String, value: Boolean, error: string = '') {
    let formArr = this.formBuilderDomRegistryService.getAllComponents();
    formArr.forEach(element => {
      if (element.formBuilderComponent.getId() == id) {
        element.formBuilderComponent.setValid(value);
        element.formBuilderComponent.setError(error);
      }
    });
  }

  setAutoOptions(doc: FormJsonModel | ElementJsonModel, options: any[]) {
    let formArr = this.formBuilderDomRegistryService.getAllComponents();
    formArr.forEach(element => {
      if (element.formBuilderComponent.getId() == doc.id) {
        element.formBuilderComponent.setAutoOptions(options);
      }
    });
  }

  setLoading(id: string, value: boolean) {
    let formArr = this.formBuilderDomRegistryService.getAllComponents();
    formArr.forEach(element => {
      if (element.formBuilderComponent.getId() == id) {
        element.formBuilderComponent.setLoading(value);
      }
    });
  }

  validateExpressions(expressions: any[], docId: any = null, value: any = null) {
    let expressionString = '';
    expressions.forEach(expressionItem => {
      if (expressionItem.condition == 'AND') {
        expressionString += ` && `;
      } else if (expressionItem.condition == 'OR') {
        expressionString += ` || `;
      }
      let expressionSubString = '';
      expressionItem.childrens.forEach((expression: ExpressionModel) => {
        if (CONDITIONS.includes(expression.operator)) {
          let targetIdValue = (expression.sourceElementId == docId) ? value : this.getValueByElementId(expression.sourceElementId);
          expressionSubString = getConditionString(expression, targetIdValue, expressionSubString);
        }
      });
      expressionString += `( ${expressionSubString} )`;
    });

    return eval(expressionString);
  }

  switchTab(tab: any) {
    if (!this.isReadOnly) {
      this.showNavButtons = false;
      this.loaderService.setLoader(true);

      // if user want to navigate previous form then allow
      if (tab.index < this.currentFormIndex && tab.isSubmit == undefined) {
        this.currentFormIndex = tab.index;
        this.onSave(this.requestData?.forms[tab.index])
        return;
      }

      // validate form next form
      if (!this.validateForm()) {
        this.showNavButtons = true;
        this.loaderService.setLoader(false);
        this.openDialog();
        return;
      }

      this.currentFormIndex = tab.index;

      // on submit
      if (tab.isSubmit) {
        this.onSave();
        return;
      }

      this.onSave(this.requestData?.forms[tab.index])
      return;
    }

    // switched
    this.showNavButtons = false;
    this.currentFormIndex = tab.index;
    this.renderForm(this.requestData?.forms[tab.index].id);
    this.loadFormJson(false);
  }

  // save answers and show same form
  saveFormOnly() {
    this.showNavButtons = false;
    this.loaderService.setLoader(true);
    this.onSave(this.requestedForm);
  }

  // show error dialog
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '15px',
    };

    // set form data
    dialogConfig.data = this.requiredElements;

    const editDialogRef = this.dialog.open(DialogErrorComponent, dialogConfig);

    editDialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy() {
    this.formBuilderDomRegistryService.reset();
  }
}
