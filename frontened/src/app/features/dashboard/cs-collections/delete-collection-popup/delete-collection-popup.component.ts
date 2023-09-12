import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CollectionsApiService } from '@core/services/collections-api.service';
import { LoaderService } from '@core/services/loader.service';
import { ToastMessageService } from '@core/services/toast-message.service';

@Component({
  selector: 'cs-delete-collection-popup',
  templateUrl: './delete-collection-popup.component.html',
  styleUrls: ['./delete-collection-popup.component.scss']
})
export class DeleteCollectionPopupComponent implements OnInit {

  public collectionId: number;
  public collectionName?: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DeleteCollectionPopupComponent>,
  private loaderService: LoaderService,
  private collectionApiService: CollectionsApiService,
  private toastMessageService:ToastMessageService) { }

  ngOnInit(): void {
    this.collectionId = this.data.id;
    this.collectionName = this.data.name;
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  deleteCollection(){
    this.loaderService.setLoader(true);
    this.collectionApiService.deleteCollection(this.collectionId).subscribe(
          (data) => {
            setTimeout(() => {
              this.loaderService.setLoader(false);
            }, 2000);
            setTimeout(() => {
              
              this.toastMessageService.success('Collection Deleted Successfully!')     
          }, 2000);
          },
          (error) => {
            this.loaderService.setLoader(false);
            this.toastMessageService.error('Failed To Delete Collection!')
          }
        );
  }
}
