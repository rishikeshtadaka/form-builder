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
import { result } from 'lodash';
import { environment } from '@environments/environment';

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
  public mode: any;
  public collectionId: string;
  public requestId: string;
  public requestData: any;
  @ViewChild('drawer1') public drawer1: MatDrawer;
  breakpoint: number;
  env = environment;
  constructor(private collectionApiService: CollectionsApiService,
    private route: Router,
    public loaderService: LoaderService,
    private formRendererApiService: FormRendererApiService,
    public sideNavService: SidenavService,
    public toastMessageService: ToastMessageService
  ) {
    this.loaderService.setNoDataTemplate(false);
    this.collectionPayload = new CollectionModel();
  }

  collectionForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
  });

  ngOnInit(): void {
    this.mode = environment.mode;
    this.breakpoint = (window.innerWidth <= 767) ? 1 : 4;
    this.breakpoint = (window.innerWidth <= 1023) ? 2 : 4;
    this.getAllRequests();

  }
  ngAfterViewInit(): void {
    this.sideNavService.setDrawer(this.drawer1);
  }


  // todo
  // public getAllRequests(){
  //   this.loaderService.setLoader(true);
  //   this.formRendererApiService.getAllRequests().subscribe((requests:any)=>{
  //     requests.forEach((request:any) => {
  //       this.collectionApiService.getCollectionById(request.collectionId).subscribe((response:any)=>{
  //         let c = response['result'];
  //         if(c){
  //           c.requestId = request.id;
  //           c.forms = request.forms;
  //           this.collectionsList.push(c);
  //         }
  //         this.loaderService.setLoader(false);
  //       })
  //     });
  //   })
  // }

  public getAllRequests() {

    this.loaderService.setLoader(true);
    this.loaderService.setNoDataTemplate(false);
    this.formRendererApiService.getAllRequests().subscribe((requests: any) => {
      if (requests.length) {
        let adminRequest = requests.filter((request: any) => request.status == 'Submitted-Customer' || request.status == 'Submitted'||request.status == 'In Progress')
        let customerRequest = requests.filter((request: any) => request.status !=='In Progress')
        this.requestData = this.mode == 'ADMIN' ? adminRequest : customerRequest;
        if (this.requestData.length > 0) {
          this.requestData.forEach((request: any) => {
            this.collectionApiService.getCollectionById(request.collectionId).subscribe((response: any) => {
              if (response) {
                let c = response['result'];
                if (c) {
                  c.requestId = request.id;
                  c.forms = request.forms;
                  c.requestStatus = request.status;
                  c.createdOn = request.createdOn;
                  this.collectionsList.push(c);
                  
                }
                this.loaderService.setLoader(false);
              }
              else {
                this.loaderService.setLoader(false);
                this.loaderService.setNoDataTemplate(true);
              }
            })
          });
        }
        else {
          this.loaderService.setLoader(false);
          this.loaderService.setNoDataTemplate(true);
        }

      }
      else {
        this.loaderService.setLoader(false);
        this.loaderService.setNoDataTemplate(true);
      }
    },
      (error) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed To Fetch Requests!');
      })

  }

  openCollection(requestId: string) {
    if (environment.mode === 'ADMIN') {
      this.route.navigateByUrl(`form-renderer/responses/${requestId}`);
    } else {
      this.route.navigateByUrl(`form-renderer/requests/${requestId}`);
    }
  }

}
