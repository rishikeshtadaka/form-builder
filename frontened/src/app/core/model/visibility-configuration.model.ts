export class VisibilityRulesConfigurationModel{
    public name: string;
    public description: string;
    public visibilityRuleId: string;
    public elementId: string;
    public action: string;
    public expressions: any[]

    public isNameValid:boolean;
    public isActionValid:boolean;
    public isElementIdValid:boolean;
    public isConditionValid:boolean;
    constructor(){
        this.expressions = [ new ExpressionModel() ]
    }
}
export class ExpressionModel{
    public condition: string;
    public sourceElementId: string;
    public type:string;
    public operator: string;
    public value: string;
    public lookup?: string;
    public childrens?:ExpressionModel[];
    // public connectorCondition?: string;

    public isFieldNameValid:boolean;
    public isConditionValid:boolean;
    public isConnectorConditionValid:boolean;

}