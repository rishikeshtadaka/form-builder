import { Util } from "@shared/utils/util";

export class RadioButtonConfigurationsModel{
    public label: string = "Single Selection";
    public type: string = "Radiobutton";
    public name: string;
    public items: any[] = [];
    public required: boolean = false;
    public disable: any = false;
    public isLabelHide: boolean = true;
    constructor(){
        this.name=Util.getUniqueName();
        this.label=Util.getUniqueSingleSelectionLabel();
    }
}