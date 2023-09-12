import { Component, Injector, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ElementJsonModel, ElementResponseJsonModel } from '@core/model/form-json.model';
import { FormBuilderComponentRegistryService } from '@features/form-builder/core/form-builder-component-registry.service';
import { ViewContainerDirective } from '@shared/directives/view-container.directive';
import { IFormBuilderComponent } from '@shared/components/base/iform-builder.component';
import { IContainerRendereComponent } from './icontainer-renderer.component';
import { FormBuilderDomRegistryService } from '@features/form-builder/core/form-builder-dom-registry.service';
import { FormBuilderComponentEncase } from '@features/form-builder/core/form-builder-component-encase';
import { FormRendererApiService } from '@core/services/form-renderer-api.service';

@Component({
    template: ''
})
export abstract class BaseElementRendererComponent implements IContainerRendereComponent, OnInit {

    protected formBuilderComponentRegistryService: FormBuilderComponentRegistryService;
    private formBuilderDomRegistryService: FormBuilderDomRegistryService;
    private formRendererApiService: FormRendererApiService;
    @ViewChild(ViewContainerDirective, { static: true }) componentHost!: ViewContainerDirective;
    public formResponse: any;
    elements: ElementResponseJsonModel[] = [];
    configurations: any;

    constructor(protected injector: Injector) {
        this.resolveAllDI();
    }


    ngOnInit(): void {
        this.renderElements();
    }

    private resolveAllDI(): void {
        this.formBuilderComponentRegistryService = this.injector.get(FormBuilderComponentRegistryService);
        this.formBuilderDomRegistryService = this.injector.get(FormBuilderDomRegistryService);
    }

    protected renderElement(element: ElementResponseJsonModel): void {
        const viewContainerRef = this.componentHost.viewContainerRef;
        let e = this.formBuilderComponentRegistryService.getComponent(element.type);
        let newlyCreatedComponent = viewContainerRef?.createComponent<IFormBuilderComponent>(
            e.component
        ).instance!;
        // add unique add while registering to dom
        this.formBuilderDomRegistryService.setComponent(Math.random().toString(), new FormBuilderComponentEncase(newlyCreatedComponent));
        
        if (this.configurations?.disable) {
            element.configurations.general.disable = true;
        }
        newlyCreatedComponent.setValue(element.value);
        newlyCreatedComponent.setId(element.id);
        newlyCreatedComponent.setVisibility(element.visible);
        newlyCreatedComponent.setConfigurations(element.configurations.general)
        newlyCreatedComponent.setVisibilityConfigurations(element.configurations.visibility);
        newlyCreatedComponent.setValidityConfigurations(element.configurations.validation);
    }

    protected renderElements(): void {
        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];
            this.renderElement(element);
        }
    }

    setConfigurations(configurations: any): void {
        this.configurations = configurations
    }

    getConfigurations() {
        return this.configurations;
    }

}