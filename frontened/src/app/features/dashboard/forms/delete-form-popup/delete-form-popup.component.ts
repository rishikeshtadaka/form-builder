import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CollectionsApiService } from '@core/services/collections-api.service';
import { FormBuilderApiService } from '@core/services/form-builder-api.service';
import { LoaderService } from '@core/services/loader.service';
import { ToastMessageService } from '@core/services/toast-message.service';

@Component({
  selector: 'cs-delete-form-popup',
  templateUrl: './delete-form-popup.component.html',
  styleUrls: ['./delete-form-popup.component.scss']
})
export class DeleteFormPopupComponent implements OnInit {

  public formId: string;
  public collectionId: string;
  public formName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DeleteFormPopupComponent>,
  private loaderService: LoaderService,
  private formBuilderApiService: FormBuilderApiService,
  private toastMessageService:ToastMessageService,
  private route: Router) { }

  ngOnInit(): void {
    this.collectionId = this.data.collectionId;
    this.formId = this.data.formId;
    this.formName = this.data.formName;
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  deleteForm() {
    this.loaderService.setLoader(true);
    this.formBuilderApiService.deleteForm(this.collectionId, this.formId).subscribe(
      (data) => {
        setTimeout(() => {
          this.route.navigateByUrl(`collections/${this.collectionId}`);
          this.loaderService.setLoader(false);
        }, 2000);
        setTimeout(() => {
          
          this.toastMessageService.success('Form Deleted Successfully');
        }, 2000);
      },
      (error) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed To Delete Form');
      }
    );
  }
}
