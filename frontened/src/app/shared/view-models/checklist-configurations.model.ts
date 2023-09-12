import { Util } from "@shared/utils/util";

export class ChecklistConfigurationsModel{
    public label: string = "Multiple Selection";
    public type: string = "Checklist";
    public name: string;
    public items: any[] = [];
    public disable: boolean = false;
    public required: boolean = false;
    public isLabelHide: boolean = true;
    constructor(){
        this.name=Util.getUniqueName();
        this.label=Util.getUniqueMultipleSelectionLabel();
    }
}