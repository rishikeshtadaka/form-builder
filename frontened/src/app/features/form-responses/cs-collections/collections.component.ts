import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CollectionModel } from '@shared/view-models/collections.model';
import { CollectionsApiService } from '@core/services/collections-api.service';
import { Router } from '@angular/router';
import { LoaderService } from '@core/services/loader.service';
import { FormRendererApiService } from '@core/services/form-renderer-api.service';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from '@shared/services/sidenav.service';
import { ToastMessageService } from '@core/services/toast-message.service';

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
  public collectionPayload: CollectionModel;
  public collectionsList: CollectionModel[] = [];
  // public collectionsList:[]=[];
  public collectionId:string;
  public requestId:string;
  @ViewChild('drawer1') public drawer1: MatDrawer;
  breakpoint: number;
  constructor(private collectionApiService: CollectionsApiService,
    private route: Router,
    public loaderService: LoaderService,
    private formRendererApiService:FormRendererApiService,
    public sideNavService: SidenavService,
    public toastMessageService:ToastMessageService
    ) {
    this.loaderService.setNoDataTemplate(false);
    this.collectionPayload = new CollectionModel();
  }

  collectionForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
  });

  ngOnInit(): void {
    
    this.breakpoint = (window.innerWidth <= 767) ? 1 : 4;
    this.breakpoint = (window.innerWidth <= 1023) ? 2 : 4;
    // this.getAllCollections();
    this.getAllRequests();

  }
  ngAfterViewInit(): void {
    this.sideNavService.setDrawer(this.drawer1);
  }

  public getAllCollections() : void{
    this.loaderService.setLoader(true);
    this.loaderService.setNoDataTemplate(false);
    this.collectionApiService.getCollections().subscribe((response: any) => {
      if(response.length)
      {
        this.collectionsList = response;
      this.loaderService.setLoader(false);
      }
      else{
      this.loaderService.setLoader(false);
      this.loaderService.setNoDataTemplate(true);

      }
    // this.toastMessageService.success('Requests Fetched Successfully!');
  },
  (error) => {
    this.loaderService.setLoader(false);
    this.toastMessageService.error('Failed!');
  });
  }
// todo
public getAllRequests(){
  this.loaderService.setLoader(true);
  this.loaderService.setNoDataTemplate(false);
  this.formRendererApiService.getAllRequests().subscribe((requests:any)=>{
    if(requests.length){
      requests.forEach((request:any) => {
        this.collectionApiService.getCollectionById(request.collectionId).subscribe((response:any)=>{
          if(response){
            let c = response['result'];
            if(c){
              c.requestId = request.id;
              c.forms = request.forms;
              this.collectionsList.push(c);
            }
            this.loaderService.setLoader(false);
          }
          else{
            this.loaderService.setLoader(false);
            // this.loaderService.setNoDataTemplate(true);
          }
          
        })
      });
    }
    else{
      this.loaderService.setLoader(false);
      this.loaderService.setNoDataTemplate(true);
    }
    // setTimeout(() => {
    //   this.toastMessageService.success('Requests Fetched Successfully!');
    // },1000);
  },
  (error) => {
    this.loaderService.setLoader(false);
    this.toastMessageService.error('Failed To Fetch Requests!');
  })
}

  public initializeData(): void {
    this.collectionPayload.name = this.collectionForm.controls['name'].value;
    this.collectionPayload.description =
      this.collectionForm.controls['description'].value;
    this.collectionPayload.status = 'Created';
  }

  saveCollection() {
    this.initializeData();
    this.loaderService.setLoader(true);
    this.collectionApiService
      .createCollection(this.collectionPayload)
      .subscribe((response: any) => {
        this.getAllCollections();
    this.loaderService.setLoader(false);
        this.route.navigateByUrl(`/collections`);
      });
    this.showcreateCollection = false;
    this.collectionForm.reset();
  }
  onCancel() {
    this.showcreateCollection = false;
    this.collectionForm.reset();
  }
  showCreateCollection() {
    this.showcreateCollection = true;
  }

  openForm(collection: CollectionModel): void {
    this.openFormList = true;
    this.selectedCollection = collection;
  }

  openCollection(requestId: string) {
    this.route.navigateByUrl(`form-responses/requests/${requestId}`);
  }

  deleteCollection(id: number) {
    this.loaderService.setLoader(true);
    this.collectionApiService.deleteCollection(id).subscribe(
      (data) => {
        this.getAllCollections();
        this.loaderService.setLoader(false);
        
      },
      (error) => {
      }
    );
  }
}
