import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormJsonModel } from '@core/model/form-json.model';
import { CollectionsApiService } from '@core/services/collections-api.service';
import { FormRendererApiService } from '@core/services/form-renderer-api.service';
import { LoaderService } from '@core/services/loader.service';
import { ToastMessageService } from '@core/services/toast-message.service';
import { CollectionModel } from '@shared/view-models/collections.model';

@Component({
  selector: 'cs-add-edit-collection',
  templateUrl: './add-edit-collection.component.html',
  styleUrls: ['./add-edit-collection.component.scss'],
})
export class AddEditCollectionComponent implements OnInit {
  public collectionPayload: CollectionModel;
  submitted = false;
  public collectionsList: CollectionModel[] = [];
  collectionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    fontFamily: new FormControl('', [Validators.required]),
    backgroundColor: new FormControl('', [Validators.required]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditCollectionComponent>,
    public formRendererApiService: FormRendererApiService,
    private loaderService: LoaderService,
    private collectionApiService: CollectionsApiService,
    private route: Router,
    private toastMessageService: ToastMessageService
  ) {
    this.collectionPayload = new CollectionModel();
  }
  fontFamily = [
    { value: "'Open Sans', sans-serif", viewValue: 'Open Sans' },
    { value: "'Lato', sans-serif", viewValue: 'Lato' },
    { value: "'Montserrat', sans-serif", viewValue: 'Montserrat' },
    { value: "'Oswald', sans-serif", viewValue: 'Oswald' },
    { value: "'Source Sans 3', sans-serif", viewValue: 'Source Sans 3' },
  ];
  backgroundColor = [
    { value: '#FFE0FD', viewValue: 'Pink' },
    { value: '#D1D6FF', viewValue: 'Lavender' },
    { value: '#F9F7EE', viewValue: 'Seashell' },
    { value: '#D0EDFF', viewValue: 'Water' },
    { value: '#FDE9C0', viewValue: 'Bisque' },
    { value: '#A4E0D5', viewValue: 'Crystal Green' },
  ];

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.getCollectionDetails();
    }
  }
  get collectionFormControls(): any {
    return this.collectionForm['controls'];
  }
  getCollectionDetails(): void {
    this.loaderService.setLoader(true);
    this.formRendererApiService
      .updateCollection(this.data.collectionData.id, this.data.collectionData)
      .subscribe((response: any) => {
        this.collectionForm.patchValue({
          name: response.result.name,
          description: response.result.description,
          fontFamily: response.result.fontFamily,
          backgroundColor: response.result.backgroundColor,
        });
        response.result;          
        this.loaderService.setLoader(false);
      });
  }
  initializeData(): void {
    this.collectionPayload.name = this.collectionForm.controls['name'].value!;
    this.collectionPayload.description =
      this.collectionForm.controls['description'].value!;
    this.collectionPayload.status = 'Created';
    this.collectionPayload.fontFamily =
      this.collectionForm.controls['fontFamily'].value!;
    this.collectionPayload.backgroundColor =
      this.collectionForm.controls['backgroundColor'].value!;
  }
  saveCollection(): void {
    this.loaderService.setLoader(true);
    this.submitted = true;
    if (this.collectionForm.valid) {
      this.initializeData();
      if (this.data.isEdit) {
        this.dialogRef.close(true);
        this.getCollectionDetails();
      } else {
        this.loaderService.setLoader(true);
        this.collectionApiService
          .createCollection(this.collectionPayload)
          .subscribe((response: any) => {
            this.route.navigate(['/collections']);
            this.getAllCollections();
              this.loaderService.setLoader(false);
          });
        this.collectionForm.reset();
        this.dialogRef.close(true);
      }
    } else {
      this.collectionForm.markAllAsTouched();
      this.loaderService.setLoader(false);
    }
  }
  onCancel() {
    this.collectionForm.reset();
    this.dialogRef.close(false);
  }

  public getAllCollections(): void {
    this.loaderService.setLoader(true);
    this.loaderService.setNoDataTemplate(false);
    this.collectionApiService.getCollections().subscribe(
      (response: any) => {
        if (response.length) {
          this.collectionsList = response;

          this.loaderService.setLoader(false);
        } else {
          this.loaderService.setLoader(false);
          this.loaderService.setNoDataTemplate(true);
        }
      },
      (error) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed To Fetch Collections!');
      }
    );
  }
}
