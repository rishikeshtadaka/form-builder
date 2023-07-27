import { BaseFormBuilderComponent } from '@shared/components/base/base-form-builder.component';
import { JsonUtil } from '@shared/utils/json-util';

export class FormJsonParser {
  public parse(json: string): BaseFormBuilderComponent[] {
    let dom = (json = JsonUtil.getObject(json));
    return [];
  }
}
