import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { RowComponent } from './row/row.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ComponentPaletteComponent } from './component-palette/component-palette.component';
import { ComponentConfigurationComponent } from './component-configuration/component-configuration.component';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';
import { CommonStyleConfigurationComponent } from './common-style-configuration/common-style-configuration.component';
import { SectionComponent } from './section/section.component';
import { ColumnComponent } from './column/column.component';
import { TextBoxConfigurationsComponent } from './element-configurations/text-box-configurations/text-box-configurations.component';
import { LabelConfigurationsComponent } from './element-configurations/label-configurations/label-configurations.component';
import { RowConfigurationsComponent } from './element-configurations/row-configurations/row-configurations.component';
import { SectionConfigurationsComponent } from './element-configurations/section-configurations/section-configurations.component';
import { DropdownConfigurationsComponent } from './element-configurations/drop-down-configurations/dropdown-configurations.component';
import { RadioButtonConfigurationsComponent } from './element-configurations/radio-button-configurations/radio-button-configurations.component';
import { CheckListConfigurationsComponent } from './element-configurations/check-list-configurations/check-list-configurations.component';
import { TextAreaConfigurationsComponent } from './element-configurations/text-area-configurations/text-area-configurations.component';
import { NumberConfigurationsComponent } from './element-configurations/number-configurations/number-configurations.component';
import { VisibilityRulesConfigurationComponent } from './visibility-rules-configuration/visibility-rules-configuration.component';
import { ValidationRuleConfigurationComponent } from './validation-rule-configuration/validation-rule-configuration.component';
import { ElementsSingleSelectDdlComponent } from './elements-single-select-ddl/elements-single-select-ddl.component';
import { ComputationRuleConfigurationComponent } from './computation-rule-configuration/computation-rule-configuration.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { ShareCollectionComponent } from './share-collection/share-collection.component';
import { DeleteComponentPopupComponent } from './delete-component-popup/delete-component-popup.component';
import { VisibilityRuleExpressionComponent } from './visibility-rule-expression/visibility-rule-expression.component';
import { ValidationRuleExpressionComponent } from './validation-rule-expression/validation-rule-expression.component';

@NgModule({
  declarations: [
    RowComponent,
    FormBuilderComponent,
    ComponentPaletteComponent,
    ComponentConfigurationComponent,
    ComponentWrapperComponent,
    CommonStyleConfigurationComponent,
    SectionComponent,
    ColumnComponent,
    TextBoxConfigurationsComponent,
    LabelConfigurationsComponent,
    RowConfigurationsComponent,
    SectionConfigurationsComponent,
    DropdownConfigurationsComponent,
    RadioButtonConfigurationsComponent,
    CheckListConfigurationsComponent,
    TextAreaConfigurationsComponent,
    NumberConfigurationsComponent,
    VisibilityRulesConfigurationComponent,
    ValidationRuleConfigurationComponent,
    ElementsSingleSelectDdlComponent,
    ComputationRuleConfigurationComponent,
    FormPreviewComponent,
    ShareCollectionComponent,
    DeleteComponentPopupComponent,
    VisibilityRuleExpressionComponent,
    ValidationRuleExpressionComponent
  ],
  imports: [FormBuilderRoutingModule, SharedModule],
  providers: [],
  exports: [RowComponent],
})
export class FormBuilderModule {}
