import { ChangeDetectorRef, Component, DoCheck, ElementRef, HostListener, OnInit, Renderer2, Type, ViewChild, inject } from '@angular/core';
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
import { filter, find, findIndex } from "lodash";
import { ANDing, ORing } from '@shared/utils/util';
import { ExpressionModel, ValidationRulesConfigurationModel } from '@core/model/validation-configuration.model';
import { VisibilityRulesConfigurationModel } from '@core/model/visibility-configuration.model';
import { ComputationConfigurationModel } from '@core/model/computation-configuration.model';
import { CollectionModel, emptyCollectionObj } from '@shared/view-models/collections.model';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from '@shared/services/sidenav.service';
import { ToastMessageService } from '@core/services/toast-message.service';

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

  @ViewChild(ViewContainerDirective, { static: true })
  componentHost!: ViewContainerDirective;
  public form: FormGroup;
  @ViewChild('formRenderer', { static: false }) formRenderer: ElementRef;
  isLinear = true;
  firstRender = true;
  showNavButtons = false;
  collection: CollectionModel = emptyCollectionObj;
  isReadOnly: Boolean = false;

  constructor(
    private formBuilderComponentRegistryService: FormBuilderComponentRegistryService,
    private formRendererApiService: FormRendererApiService,
    private _formBuilder: FormBuilder,
    private formBuilderDomRegistryService: FormBuilderDomRegistryService,
    private collectionApiService: CollectionsApiService,
    public loaderService: LoaderService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    public sideNavService: SidenavService,
    private toastMessageService:ToastMessageService
  ) {
    this.loaderService.setNoDataTemplate(false);
    this.formJsonModel = new FormResponseJsonModel('', '');
    this.formBuilderDomRegistryService.reset();
  }

  ngDoCheck(): void {
    if (this.firstRender && this.formBuilderDomRegistryService.getAllComponents().size > 0) {
      this.firstRender = false;
      this.setVisibilityOnLoad(this.requestedForm);
    }
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({});

    this.requestId = this.route.snapshot.params['requestId'];
    // this.formsId = this.route.snapshot.params['formsId'];
    // this.isUpdate = this.requestId && this.formsId ? true : false;
    // if (this.requestId && this.formsId) {
    this.loadFormJson();
    // }

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  ngAfterViewInit(): void {
    this.sideNavService.setDrawer(this.drawer1);
  }

  renderContainer(
    element: ElementResponseJsonModel,
    component: Type<any>
  ): void {
    const viewContainerRef = this.componentHost.viewContainerRef;
    let containerComponent =
      viewContainerRef?.createComponent<IContainerRendereComponent>(component)
        .instance!;
    if (this.isReadOnly) {
      element.configurations.general.disable = true;
      element.elements.forEach(element => {
        element.configurations.general.disable = true;
      });
    }
    containerComponent.elements = element.elements;
    containerComponent.setConfigurations(element.configurations.general)
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

  initLoadClick() {
    setTimeout(() => {
      let elements = document.querySelectorAll('mat-step-header');
      if (elements) {
        elements.forEach((e, i) => {
          e.addEventListener('click', () => {
            this.jumpTo({ selectedIndex: i });
          })
        })
      }
    }, 100)
  }

  // todo
  // private loadFormJson(): void {
  //     this.loaderService.setLoader(true);
  //     this.formRendererApiService.getRequestById(this.requestId).subscribe((request:FormResponseWrapperModel)=>{
  //       this.formResponse = request.result.responses;
  //       this.requestData = request.result;
  //       request.result.forms?.forEach((formId:any) => {
  //         this.formRendererApiService.getFormById(request.result.collectionId,formId).subscribe((form:FormJsonModel)=>{
  //           this.setElementValue(form.elements);
  //           this.formJsonModel = form as FormResponseJsonModel;
  //           this.renderElements();
  //           this.loaderService.setLoader(false);
  //         })
  //       });
  //     })
  // }

  public renderForm(formId: string): void {
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
        if(form && form.elements){
           this.firstRender = true;
          this.requestedForm = form;
          this.setElementValue(form.elements);
          this.formJsonModel = form as FormResponseJsonModel;
          this.renderElements();
          this.loaderService.setLoader(false);
          this.showNavButtons = true;
        }
        else{
          this.loaderService.setLoader(false);
          this.loaderService.setNoDataTemplate(true); 
        }
      },
      (error) => {
        this.loaderService.setLoader(false);
        this.loaderService.setNoDataTemplate(true);

      });
  }

  private loadFormJson(loadFirstForm: boolean = true): void {
    this.loaderService.setLoader(true);
    this.loaderService.setNoDataTemplate(false);
    this.formRendererApiService.getRequestById(this.requestId).subscribe((request: FormResponseWrapperModel) => { 
      this.requestData = request.result;
      this.loaderService.setLoader(false);
      this.formResponse = this.requestData.responses || [];
      if (loadFirstForm && this.requestData.forms) {
        this.renderForm(this.requestData.forms[0].id);
        this.getCollectionDetails(request.result?.collectionId)
      }
      else{
        this.loaderService.setNoDataTemplate(true);
      }
      if (request.result.status && ['Submitted', 'Submitted-Customer'].includes(request.result.status)) {
        this.isReadOnly = true;
      }
      
      this.initLoadClick();
    },
    (error) => {
      this.loaderService.setLoader(false);
      this.loaderService.setNoDataTemplate(true);
      
    })
  }

  getCollectionDetails(collectionId: string) {
    this.collectionApiService.getCollectionById(collectionId).subscribe((collection: any) => {
      if (collection.result) {
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
      if (docIndex >= 0) {
          responseArr[docIndex].value = element.formBuilderComponent.getValue().toString();
      }
      else if (element.formBuilderComponent.getConfigurations().name) {
        responseArr.push({
          name: element.formBuilderComponent.getConfigurations().name,
          value: element.formBuilderComponent.getValue().toString(),
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
      payload.status = 'Submitted';
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
          this.router.navigateByUrl(`form-renderer/requests`);
        }
      },
      (error) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed!');
      });
  }
  goToPreviousForm(previousForm: any) {
    this.renderForm(previousForm.id);
    this.loadFormJson(false);
  }

  // next, back and submit handler
  jumpTo(event: any) {
    let { selectedIndex, isSaved = false, isSubmit = false } = event;

    if (!this.isReadOnly) {
      this.showNavButtons = false;
      this.loaderService.setLoader(true);

      // validate form
      if (!this.validateForm()) {
        this.showNavButtons = true;
        this.loaderService.setLoader(false);
        return;
      }

      // on submit
      if (isSubmit) {
        this.onSave()
        return;
      }
      setTimeout(() => (this.currentFormIndex = selectedIndex), 0);
      // on next
      if (isSaved) {
        this.onSave(this.requestData?.forms[selectedIndex])
        return;
      }
    }
    this.renderForm(this.requestData?.forms[selectedIndex].id);
    this.loadFormJson(false);
  }

  checkCondition(expression: ExpressionModel, value: string) {
    let isChecked = false;
    if (expression.operator?.toLowerCase() == 'gt') {
      isChecked = value > expression.value;
    } else if (expression.operator?.toLowerCase() == 'lt') {
      isChecked = value < expression.value;
    }
    if (expression.operator?.toLowerCase() == 'gte') {
      isChecked = value >= expression.value;
    } else if (expression.operator?.toLowerCase() == 'lte') {
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
      let andConditions: any[] = [];
      let orConditions: any[] = [];
      let ifConditions: any[] = [];
      if (element.configurations.visibility[0].expressions && element.configurations.visibility[0].expressions.length > 0) {
        let isConditionTrue = false;
        element.configurations.visibility[0].expressions.forEach(expression => {
          let targetIdValue = this.getValueByElementId(expression.sourceElementId);
          if (expression.condition?.toLowerCase() == 'and') {
            andConditions.push(this.checkCondition(expression, targetIdValue));
          } else if (expression.condition?.toLowerCase() == 'or') {
            orConditions.push(this.checkCondition(expression, targetIdValue));
          } else if (expression.condition?.toLowerCase() == 'if') {
            ifConditions.push(this.checkCondition(expression, targetIdValue));
          }
        });

        if (andConditions.length > 0) {
          isConditionTrue = ANDing(andConditions);
        }
        else if (orConditions.length > 0) {
          isConditionTrue = ORing(andConditions);
        }
        else if (ifConditions.length > 0) {
          isConditionTrue = ANDing(ifConditions);
        }

        if (isConditionTrue) {
          if (element.configurations.visibility[0].action == 'show') {
            this.setVisibleValue(element.id, true)
          }
          if (element.configurations.visibility[0].action == 'hide') {
            this.setVisibleValue(element.id, false)
          }
        }
        else {
          if (element.configurations.visibility[0].action == 'show') {
            this.setVisibleValue(element.id, false)
          }
          if (element.configurations.visibility[0].action == 'hide') {
            this.setVisibleValue(element.id, true)
          }
        }

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
        this.requestedForm.elements.forEach(element => {
          this.setVisibitlity(doc.id, value, element);
          this.setSiblingValue(doc, value, element);
          this.setComputationValues(doc.id, value, element);
          this.checkLookUp(doc, value, element);
        });
      }
    }
  }

  setSiblingValue(doc: any, value: string, _element: ElementJsonModel) {
    if (_element.configurations.general?.name == doc.name) {
      this.setValue(_element.id, value);
    }
    if (_element.elements && _element.elements.length > 0) {
      _element.elements.forEach(element => {
        this.setSiblingValue(doc, value, element)
      });
    }
  }

  setVisibitlity(id: string, value: string, _element: ElementJsonModel) {
    if (_element.configurations.visibility && _element.configurations.visibility?.length > 0) {
      let andConditions: any[] = [];
      let orConditions: any[] = [];
      let ifConditions: any[] = [];
      let expressionArr: ExpressionModel[] = [];

      _element.configurations.visibility[0].expressions.forEach(expression => {
        if (expression.sourceElementId == id) {
          expressionArr.push(expression);
        }
      });

      if (expressionArr && expressionArr.length > 0) {
        let isConditionTrue = false;
        expressionArr.forEach(expression => {
          let targetIdValue = value ? value : this.getValueByElementId(id);
          if (expression.condition?.toLowerCase() == 'and') {
            andConditions.push(this.checkCondition(expression, targetIdValue));
          } else if (expression.condition?.toLowerCase() == 'or') {
            orConditions.push(this.checkCondition(expression, targetIdValue));
          } else if (expression.condition?.toLowerCase() == 'if') {
            ifConditions.push(this.checkCondition(expression, targetIdValue));
          }
        });

        if (andConditions.length > 0) {
          isConditionTrue = ANDing(andConditions);
        }
        else if (orConditions.length > 0) {
          isConditionTrue = ORing(andConditions);
        }
        else if (ifConditions.length > 0) {
          isConditionTrue = ANDing(ifConditions);
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
    }
    if (_element.elements && _element.elements.length > 0) {
      _element.elements.forEach(element => {
        this.setVisibitlity(id, value, element)
      });
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
    formArr.forEach(element => {
      let elementError = false;
      let config = element.formBuilderComponent.getConfigurations();
      let validityConfig: ValidationRulesConfigurationModel[] = element.formBuilderComponent.getValidityConfigurations();

      if (validityConfig && validityConfig.length > 0) {
        let andConditions: any[] = [];
        let orConditions: any[] = [];
        let ifConditions: any[] = [];
        if (validityConfig[0].expressions && validityConfig[0].expressions.length > 0) {
          let isConditionTrue = false;
          validityConfig[0].expressions.forEach(expression => {
            let targetIdValue = this.getValueByElementId(expression.sourceElementId);
            if (expression.condition?.toLowerCase() == 'if') {
              andConditions.push(this.checkCondition(expression, targetIdValue));
            } else if (expression.condition?.toLowerCase() == 'else') {
              andConditions.push(this.checkCondition(expression, targetIdValue));
            }
          });

          if (andConditions.length > 0) {
            isConditionTrue = ANDing(andConditions);
          }
          else if (orConditions.length > 0) {
            isConditionTrue = ORing(andConditions);
          }
          else if (ifConditions.length > 0) {
            isConditionTrue = ANDing(ifConditions);
          }

          if (isConditionTrue && validityConfig[0].message && !element.formBuilderComponent.getValue()) {
            isValidAll = false;
            elementError = true;
            element.formBuilderComponent.setError(validityConfig[0].message)
          }
        }
      }

      if ((config.required == true || config.required == 'true') && element.formBuilderComponent.isVisible()) {
        let elemValue = element.formBuilderComponent.getValue() || '';
        if (elemValue == undefined || !elemValue) {
          isValidAll = false;
          elementError = true;
          element.formBuilderComponent.setError(`Please provide valid "${config.label}"`)
        }
      }

      if ((config.maximum || config.minimum) && element.formBuilderComponent.isVisible()) {
        let elemValue = element.formBuilderComponent.getValue() || '';
        if (+elemValue > +config.maximum || +elemValue < +config.minimum) {
          isValidAll = false;
          elementError = true;
          element.formBuilderComponent.setError(`Please provide valid "${config.label}"`)
        }
      }

      if (!element.formBuilderComponent.isValid() && element.formBuilderComponent.isVisible()) {
        isValidAll = false;
        elementError = true;
        element.formBuilderComponent.setError(`Please provide valid details`)
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
        this.setElementValid(doc.id, false);
        let url = _element.configurations.general.lookup;
        if (url && url.indexOf(doc.name) != -1) {
          url = url.replace(doc.name, value);
        }
        this.formRendererApiService.apiCall(url).subscribe((response: any) => {
          if (response.completed) {
            this.setElementValid(doc.id, true);
          }
          else {
            this.setElementValid(doc.id, false, response.title);
            return;
          }
        });
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
        if (+value.length < +_element.configurations.general?.minimumLength) {
          this.setElementValid(doc.id, false, `${_element.configurations.general.label} should be minimum length ${_element.configurations.general?.minimumLength}`);
          return;
        }
      }

      // min lenght char check
      if (_element.configurations.general?.maximumLength) {
        if (+value.length > +_element.configurations.general?.maximumLength) {
          this.setElementValid(doc.id, false, `${_element.configurations.general.label} should be maximum length ${_element.configurations.general?.maximumLength}`);
          return;
        }
      }

      // required check
      if (_element.configurations.general?.required && _element.configurations.general?.required == 'true') {
        if (!value || (value && value?.trim().length == 0)) {
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
      if (!element.formBuilderComponent.getId()) {
      }
    });
  }

  ngOnDestroy() {
    this.formBuilderDomRegistryService.reset();
  }
}
