import { ElementJsonModel } from "@core/model/form-json.model";

export interface IContainerRendereComponent {
    elements: ElementJsonModel[];
    getConfigurations(): any;
    setConfigurations(value: any): void;
}