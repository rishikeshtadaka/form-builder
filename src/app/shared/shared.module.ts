import { NgModule } from "@angular/core";
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DropdownListComponent } from './components/dropdown-list/dropdown-list.component';

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