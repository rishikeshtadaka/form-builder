import { Util } from "@shared/utils/util";

export class DropdownConfigurationsModel{
    public label: string = "Dropdown";
    public type: string = "Dropdown";
    public name: string;
    public items: string[] = [];
    public required: boolean = false;
    public disable: any = false;
    public isLabelHide: boolean = true;
    constructor(){
        this.name=Util.getUniqueName();
        this.label=Util.getUniqueDropdownLabel();
    }
}