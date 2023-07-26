import { IFormBuilderComponent } from "./iform-builder.component";

export abstract class BaseFormBuilderComponent implements IFormBuilderComponent{
    public abstract getJson():any;
    public abstract setJson(json:any):void;
}