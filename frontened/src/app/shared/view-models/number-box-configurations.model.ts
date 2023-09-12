import { Util } from "@shared/utils/util";

export class NumberBoxConfigurationsModel{
    public name: string;
    public type: string = "number";
    public required: boolean = false;
    public lookup: string;
    public enable: boolean;
    public toolTip: string;
    public label:string = "Number";
    public placeholder:string;
    public disable: boolean = false;
    public minimum: number;
    public maximum: number;
    public regex: string;
    public responseMapping: string;
    public autoOptions: any[] = [];
    public isLoading: boolean = false;
    public isLabelHide: boolean = true;
    constructor(){
        this.name=Util.getUniqueName();
        this.label=Util.getUniqueNumberLabel();
    }
}