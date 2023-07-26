import { NgModule } from "@angular/core";
import { DatePickerComponent } from './components/form-builder/date-picker/date-picker.component';
import { DropdownListComponent } from './components/form-builder/dropdown-list/dropdown-list.component';
import { TextBoxComponent } from './components/form-builder/text-box/text-box.component';
import { ChecklistComponent } from './components/form-builder/checklist/checklist.component';

@NgModule({
    declarations: [
    DatePickerComponent,
    DropdownListComponent,
    TextBoxComponent,
    ChecklistComponent
  ],
    imports: [],
    providers: [],
    exports:[
        DatePickerComponent,
        DropdownListComponent]
  })
export class SharedModule{

}