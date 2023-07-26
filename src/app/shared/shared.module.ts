import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DatePickerComponent } from './components/form-builder/date-picker/date-picker.component';
import { DropdownListComponent } from './components/form-builder/dropdown-list/dropdown-list.component';
import { TextBoxComponent } from './components/form-builder/text-box/text-box.component';
import { ChecklistComponent } from './components/form-builder/checklist/checklist.component';
import { TextAreaComponent } from './components/form-builder/text-area/text-area.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';

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
    TextAreaComponent,
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    NgFor,
  ],
  providers: [],
  exports: [
    DatePickerComponent,
    DropdownListComponent,
    TextBoxComponent,
    ChecklistComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
  ],
})
export class SharedModule {}
