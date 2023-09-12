import { ElementJsonModel } from "@core/model/form-json.model";
import { IFormBuilderComponent } from "@shared/components/base/iform-builder.component";

export interface IFormBuilderContainerComponent extends IFormBuilderComponent{
    elements:ElementJsonModel[];
}