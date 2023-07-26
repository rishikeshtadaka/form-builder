import { NgModule } from "@angular/core";
import { DatePickerComponent } from './components/form-builder/date-picker/date-picker.component';
import { DropdownListComponent } from './components/form-builder/dropdown-list/dropdown-list.component';
import { TextBoxComponent } from './components/form-builder/text-box/text-box.component';
import { ChecklistComponent } from './components/form-builder/checklist/checklist.component';
import { FormsModule } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    declarations: [
    DatePickerComponent,
    DropdownListComponent,
    TextBoxComponent,
    ChecklistComponent
  ],
    imports: [FormsModule,MatFormFieldModule,MatInputModule],
    providers: [],
    exports:[
        DatePickerComponent,
        DropdownListComponent,      
        TextBoxComponent,
        ChecklistComponent,
        FormsModule,MatFormFieldModule,MatInputModule
  ]
  })
export class SharedModule{

}