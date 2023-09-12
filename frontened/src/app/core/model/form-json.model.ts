import { ComputationConfigurationModel } from "./computation-configuration.model";
import { ValidationRulesConfigurationModel } from "./validation-configuration.model";
import { VisibilityRulesConfigurationModel } from "./visibility-configuration.model";

export class ElementJsonModel {
    value: string;
    public constructor(
        public id: string,
        public type: string,
        public configurations: ConfigurationModel,
        public elements: ElementJsonModel[] = []) { }

    public static getElementWithType(type: string): ElementJsonModel {
        let configurations = new ConfigurationModel(null);
        return new ElementJsonModel("", type, configurations, []);
    }

    public static getEmptyElement(): ElementJsonModel {
        let configurations = new ConfigurationModel(null);
        return new ElementJsonModel("", "", configurations, []);
    }

    public static getElementWithIdAndType(id: string, type: string): ElementJsonModel {
        let configurations = new ConfigurationModel(null);
        return new ElementJsonModel(id, type, configurations, []);
    }
}
export class ElementResponseJsonModel extends ElementJsonModel {
    public override value: any;
    public override elements: ElementResponseJsonModel[] = []
    visible: Boolean;
}
export class FormJsonModel {
    public id: string;
    public elements: ElementJsonModel[];
    public configurations: ConfigurationModel;
    constructor(public name: string, public Id: string) {
        this.elements = [];
    }
}
export class FormResponseJsonModel extends FormJsonModel {
    public override elements: ElementResponseJsonModel[];
}
export class ConfigurationModel {
    public general: any;
    public visibility?: VisibilityRulesConfigurationModel[];
    public validation?: ValidationRulesConfigurationModel[];
    public computation?: ComputationConfigurationModel[];
    constructor(general: any, visibility?: VisibilityRulesConfigurationModel[], validation?: ValidationRulesConfigurationModel[], computation?: ComputationConfigurationModel[]) {
        this.general = general,
            this.visibility = visibility,
            this.validation = validation,
            this.computation = computation
    }
}
