import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CollectionModel } from '@shared/view-models/collections.model';
import { CollectionsApiService } from '@core/services/collections-api.service';
import { Router } from '@angular/router';
import { LoaderService } from '@core/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ShareCollectionComponent } from '../../form-builder/share-collection/share-collection.component';
import { ToastMessageService } from '@core/services/toast-message.service';
import { AddEditCollectionComponent } from '@features/form-builder/add-edit-collection/add-edit-collection.component';
import { DeleteCollectionPopupComponent } from './delete-collection-popup/delete-collection-popup.component';
import { forEach, result } from 'lodash';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { FormBuilderApiService } from '@core/services/form-builder-api.service';
import { FormRendererApiService } from '@core/services/form-renderer-api.service';

@Component({
  selector: 'cs-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  @Input() header: string;
  public showcreateCollection: boolean = false;
  public openFormList: boolean = false;
  public selectedCollection: CollectionModel;
  public showcreateForm: boolean = false;
  public collectionsList: CollectionModel[] = []

  breakpoint: number;
  constructor(private collectionApiService: CollectionsApiService,
    private formApiService: FormBuilderApiService,
    private toastMessageService:ToastMessageService,
    private route: Router,
    public loaderService: LoaderService,
    public dialog: MatDialog,
    private router: Router,
    private formRendererApiService: FormRendererApiService) {
    this.loaderService.setNoDataTemplate(false);
  }


  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 767) ? 1 : 4;
    this.breakpoint = (window.innerWidth <= 1023) ? 2 : 4;
    // this.getAllCollections();
    this.getAllCollectionsWithForms();
  }

  public getAllCollections() : void{
    this.loaderService.setLoader(true);
    this.loaderService.setNoDataTemplate(false);
    this.collectionApiService.getCollections().subscribe((response: any) => {
      if(response.length){
        this.collectionsList = response;
      }
      else{
        this.loaderService.setLoader(false);
        this.loaderService.setNoDataTemplate(true);
      }
      this.loaderService.setLoader(false);
    },
    (error: any) => {
      this.loaderService.setLoader(false);
      this.toastMessageService.error('Failed To Fetch Collections!')
    }
    
    );
  }

  public getAllCollectionsWithForms(): void {
    this.loaderService.setLoader(true);
    this.loaderService.setNoDataTemplate(false);

    this.collectionApiService.getCollections()
      .pipe(
        switchMap((collectionsResponse: any) =>
          forkJoin(collectionsResponse
            .map((collection: any) =>
              this.formApiService.getForms(collection.id)
                .pipe(
                  map((forms: any) => ({
                    ...collection,
                    forms: forms
                  }))
                )
            ))
        )
      ).subscribe((collectionsWithForms: any) => {
        if (collectionsWithForms) {
          if(!this.collectionsList.length){

            this.loaderService.setNoDataTemplate(true);
          }
          this.collectionsList = collectionsWithForms;      
          setTimeout(() => {
            
            this.loaderService.setLoader(false);
          }, 3000);

        }
        else {
          this.loaderService.setLoader(false);
          this.loaderService.setNoDataTemplate(true);
        }
      },
        (error: any) => {
          this.loaderService.setLoader(false);
          this.toastMessageService.error('Failed To Fetch Collections!')
        });
  }

  showCreateEditCollection(isEdit: boolean, collection?: any) {
    let isEditCollection;
    if(isEdit) {
      isEditCollection = collection;
    }
    const dialogRef = this.dialog.open(AddEditCollectionComponent, {
      data: {
        isEdit: isEdit,
        collectionData: isEditCollection
      }
    });
 
     dialogRef.afterClosed().subscribe((result: any) => {
    

       if (result) {
        // this.getAllCollections();
        this.getAllCollectionsWithForms();
       }
     });
  }

  showDeleteCollection(collection?: any){
    const dialogRef = this.dialog.open(DeleteCollectionPopupComponent, {
      data: {
        id: collection.id,
        name: collection.name
      }
    });
    dialogRef.afterClosed().subscribe((result: any)=>{
      if(result){
        // this.getAllCollections();
        this.getAllCollectionsWithForms();
      }
    });
  }

  openForm(collection: CollectionModel): void {
    this.openFormList = true;
    this.selectedCollection = collection;
  }

  openCollection(id: number) {
    this.route.navigateByUrl(`/collections/${id}`);
  }

  shareCollection(collection: any) {
    const formList = collection.forms.map((form: any) => ({ id: form.id, name: form.name }))
    const payLoad = {
      collectionId: collection.id,
      forms: formList,
      user: null
    }
    this.loaderService.setLoader(true);
    this.formRendererApiService.saveCollectionResponse(payLoad).subscribe((response: any) => {
      this.loaderService.setLoader(false);
      this.toastMessageService.success('Collection Shared Successfully!');
    },
      (error: any) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed To Share Collection!')
      });
  }

  openSharePopup(collectionDetails: any): void {
    const dialogRef = this.dialog.open(ShareCollectionComponent, {
      data: {
        collectionDetails: collectionDetails
      }
   });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
