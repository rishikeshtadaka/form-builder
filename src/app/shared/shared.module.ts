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
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule } from '@angular/material/core';

import { ComponentHolderComponent } from './components/form-builder/component-holder/component-holder.component';

@NgModule({
  declarations: [
    DatePickerComponent,
    DropdownListComponent,
    TextBoxComponent,
    ChecklistComponent,
    TextAreaComponent,
    ComponentHolderComponent,
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
    MatButtonModule,
    MatGridListModule,
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
    MatButtonModule,
    MatGridListModule,
  ],
})
export class SharedModule {}
