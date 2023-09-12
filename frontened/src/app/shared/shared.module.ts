import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, JsonPipe} from '@angular/common';
import { DatePickerComponent } from './components/form-builder/date-picker/date-picker.component';
import { DropdownListComponent } from './components/form-builder/dropdown-list/dropdown-list.component';
import { TextBoxComponent } from './components/form-builder/text-box/text-box.component';
import { ChecklistComponent } from './components/form-builder/checklist/checklist.component';
import { TextAreaComponent } from './components/form-builder/text-area/text-area.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LabelComponent } from './components/form-builder/label/label.component';
import { CheckBoxComponent } from './components/form-builder/check-box/check-box.component';
import { RadioButtonComponent } from './components/form-builder/radio-button/radio-button.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ViewContainerDirective } from './directives/view-container.directive';
import {MatStepperModule} from '@angular/material/stepper';
import { NumberBoxComponent } from './components/form-builder/number-box/number-box.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import { LoaderComponent } from './components/loader/loader.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddEditCollectionComponent } from '@features/form-builder/add-edit-collection/add-edit-collection.component';
import { RouterModule } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EllipsisDirective } from './directives/ellipsis.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    DatePickerComponent,
    DropdownListComponent,
    TextBoxComponent,
    ChecklistComponent,
    TextAreaComponent,
    LabelComponent,
    CheckBoxComponent,
    RadioButtonComponent,
    ViewContainerDirective,
    NumberBoxComponent,
    LoaderComponent,
    NavigationComponent,
    AddEditCollectionComponent,
    EllipsisDirective
  ],
  imports: [
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    NgFor,
    NgIf,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    JsonPipe,
    MatCheckboxModule,
    MatRadioModule,
    MatMenuModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    CommonModule,
    DragDropModule,
    MatStepperModule,
    MatDialogModule,
    RouterModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
  exports: [
    DatePickerComponent,
    RouterModule,
    DropdownListComponent,
    TextBoxComponent,
    ChecklistComponent,
    FormsModule,
    LoaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    NgFor,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    CommonModule,
    ViewContainerDirective,
    ReactiveFormsModule,
    DragDropModule,
    MatStepperModule,
    MatDialogModule,
    NavigationComponent,
    EllipsisDirective
  ],
})
export class SharedModule {}
