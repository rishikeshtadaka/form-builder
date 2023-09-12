export class ValidationRulesConfigurationModel {

    public name: string;
    public description: string;
    public validationRuleId: string;
    public message: string;
    public expressions: any[]
    public isNameValid:boolean;
    public isActionValid:boolean;
    public isElementIdValid:boolean;
    public isConditionValid:boolean;
    constructor() {
        this.expressions = [new ExpressionModel()]
    }

}
export class ExpressionModel {
    public condition: string;
    public sourceElementId?: string | null;
    public operator: string;
    public value: string;
    public lookup?: any;
    public childrens?:ExpressionModel[];
    public isFieldNameValid:boolean;
    public isConditionValid:boolean;
    public isConnectorConditionValid:boolean;

}