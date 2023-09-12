import { Util } from "@shared/utils/util";

export class SectionConfigurationModel{
    public label: string = "Section 1"
    public name: string = "_name";
    public id: string = "section 1";
    public internal: boolean = false;
    constructor(){
        this.name=Util.getUniqueName();
    }
}


