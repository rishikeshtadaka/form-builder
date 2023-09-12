import { Util } from "@shared/utils/util";

export class TextBoxConfigurationsModel{
    public name: string;
    public id?: string;
    public inputType: string;
    public lookup: string;
    public required: boolean = false;
    public maximumLength: number = 20;
    public minimumLength: number = 1;
    public enable: boolean;
    public toolTip: string;
    public disable: boolean = false;
    public label:string = "Short Text";
    public placeholder:string;
    public regex: string;
    public responseMapping: string;
    public autoOptions: any[] = [];
    public isLoading: boolean = false;
    public isLabelHide: boolean = true;
    constructor(){
        this.name=Util.getUniqueName();
        this.label=Util.getUniqueShortTextLabel();
    }
}
