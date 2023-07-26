import { NgModule } from "@angular/core";
import { DatePickerComponent } from './components/form-builder/date-picker/date-picker.component';
import { DropdownListComponent } from './components/form-builder/dropdown-list/dropdown-list.component';

@NgModule({
    declarations: [
    DatePickerComponent,
    DropdownListComponent
  ],
    imports: [],
    providers: [],
    exports:[
        DatePickerComponent,
        DropdownListComponent]
  })
export class SharedModule{

}