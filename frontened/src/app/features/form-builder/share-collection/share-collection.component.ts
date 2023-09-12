import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormJsonModel } from '@core/model/form-json.model';
import { FormRendererApiService } from '@core/services/form-renderer-api.service';
import { LoaderService } from '@core/services/loader.service';
import { ToastMessageService } from '@core/services/toast-message.service';

@Component({
  selector: 'cs-share-collection',
  templateUrl: './share-collection.component.html',
  styleUrls: ['./share-collection.component.scss'],
})
export class ShareCollectionComponent
  implements OnInit
{
  userForm: FormGroup;
  user: any;
  userList: any[] = [{id: 1, name: 'Rupesh'},{id: 2, name: 'Terence'},{id: 3, name: 'Akash'}];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ShareCollectionComponent>,
  public formRendererApiService: FormRendererApiService,
  private loaderService: LoaderService,
  private toastMessageService:ToastMessageService) {
    this.userForm = new FormGroup({
      user: new FormControl()
  });
  }

  ngOnInit(): void {
  }

  saveShareUserList() {
    this.loaderService.setLoader(true);
    this.formRendererApiService
      .getFormCollectionForms(this.data.collectionDetails.id)
      .subscribe((response) => {
        // this.formJsonModel = response;
        let formList:any = [];
        let payLoad;
        response.forEach(element => {
          formList.push({
            id: element.id,
            name: element.name
          })
        });
        payLoad = {
          collectionId: this.data.collectionDetails.id,
          forms: formList,
          user: null
        }
        this.formRendererApiService.saveCollectionResponse(payLoad).subscribe((response) => {
          this.toastMessageService.success('Collection Shared Successfully!');

          this.loaderService.setLoader(false);
        }
        );
        this.loaderService.setLoader(false);
      });
   
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
