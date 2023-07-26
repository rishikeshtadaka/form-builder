import { NgModule } from "@angular/core";
import { DatePickerComponent } from './components/form-builder/date-picker/date-picker.component';
import { DropdownListComponent } from './components/form-builder/dropdown-list/dropdown-list.component';
import { TextBoxComponent } from './components/form-builder/text-box/text-box.component';
import { ChecklistComponent } from './components/form-builder/checklist/checklist.component';
import { FormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextAreaComponent } from './components/form-builder/text-area/text-area.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  MatNativeDateModule,
} from '@angular/material/core';

@NgModule({
    declarations: [
    DatePickerComponent,
    DropdownListComponent,
    TextBoxComponent,
    ChecklistComponent,
    TextAreaComponent
  ],
    imports: [FormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule],
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