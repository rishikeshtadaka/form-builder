import { Injectable } from "@angular/core";
import { ConfigurationModel, ElementJsonModel, FormJsonModel } from "@core/model/form-json.model";
import { FormBuilderComponentConstant } from "@shared/static/form-builder-component.constant";
import { FormBuilderDomRegistryService } from "./form-builder-dom-registry.service";

@Injectable({providedIn:"root"})
export class FormJsonBuilder {
  private skipElements:Map<string,string>=new Map<string,string>();//For better performance used map instead of array.
  public constructor(private formBuilderDomRegistryService: FormBuilderDomRegistryService){
    this.setSkipElements();
  }

  private setSkipElements():void{
    this.skipElements.set(FormBuilderComponentConstant.wrapper,"");
    this.skipElements.set(FormBuilderComponentConstant.column,"");
    this.skipElements.set(FormBuilderComponentConstant.elementsSingleSelectDdl,"");
  }

  private walkDOM (node : any,domHierarchy:ElementJsonModel[]) :void{
    if(!node || !node.tagName) return;

    let tagName = node.tagName.toLowerCase();

    if(tagName.startsWith("cs-"))
    {      
      if(!this.skipElements.has(tagName))
        {
          let id=node.parentElement.id;
          let element=this.formBuilderDomRegistryService.getComponent(id);
          domHierarchy.push(new ElementJsonModel(id,tagName, new ConfigurationModel(element.formBuilderComponent.getConfigurations(), element.getVisibility(), element.getValidation(), element.getComputation())));
        }

      if(tagName===FormBuilderComponentConstant.section || tagName===FormBuilderComponentConstant.row){        
        domHierarchy=domHierarchy[domHierarchy.length-1].elements;
      }
    }

    node = node.firstChild;
    while(node) {
        this.walkDOM(node,domHierarchy);
        node = node.nextSibling;
    }

  };  
  
  public build(formName:string,id:string): FormJsonModel {
    var elements : ElementJsonModel[] = [];
    this.walkDOM(document.getElementById("build-area"),elements);
    let formJson=new FormJsonModel(formName,id);
    formJson.elements=elements;
    return formJson;
  }
}
