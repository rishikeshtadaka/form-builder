import { Injectable } from "@angular/core";
import { ChecklistComponent } from "@shared/components/form-builder/checklist/checklist.component";
import { DatePickerComponent } from "@shared/components/form-builder/date-picker/date-picker.component";
import { DropdownListComponent } from "@shared/components/form-builder/dropdown-list/dropdown-list.component";
import { TextAreaComponent } from "@shared/components/form-builder/text-area/text-area.component";
import { TextBoxComponent } from "@shared/components/form-builder/text-box/text-box.component";

@Injectable({providedIn:"root"})
export class FormBuilderComponentService{
    private components:Map<string,any>;
    constructor(){
        this.components=new Map<string,any>();
        this.setComponents();
    }

    private setComponents():void{
        this.components.set("text-box",TextBoxComponent);
        this.components.set("text-area",TextAreaComponent);
        this.components.set("date-picker",DatePickerComponent);
        this.components.set("ddl",DropdownListComponent);
    }

    public getComponents():Map<string,any>{
        return this.components;
    }

    public getComponent(componentName:string):any{
        return this.components.get(componentName);
    }
}