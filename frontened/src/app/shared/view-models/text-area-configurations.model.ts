import { Util } from "@shared/utils/util";

export class TextAreaConfigurationsModel{
    public name: string;
    public inputType: string;
    public required: boolean = false;
    public lookup: string;
    public maximumLength: number = 20;
    public enable: boolean;
    public toolTip: string;
    public disable: boolean = false;
    public label:string = "Long Text";
    public placeholder:string;
    public regex: string;
    public responseMapping: string;
    public autoOptions: any[] = [];
    public isLoading: boolean = false;
    public isLabelHide: boolean = true;
    constructor(){
        this.name=Util.getUniqueName();
        this.label=Util.getUniqueLongTextLabel();
    }
}