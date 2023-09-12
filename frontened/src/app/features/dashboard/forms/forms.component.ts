import {
  CdkDragEnter,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionsApiService } from '@core/services/collections-api.service';
import { FormBuilderApiService } from '@core/services/form-builder-api.service';
import { LoaderService } from '@core/services/loader.service';
import { FormsModel } from '@shared/view-models/forms.model';
import { ChangeDetectorRef } from '@angular/core';
import { ToastMessageComponent } from '@core/components/toast-message/toast-message.component';
import { ToastMessageService } from '@core/services/toast-message.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFormPopupComponent } from './delete-form-popup/delete-form-popup.component';
@Component({
  selector: 'cs-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  public showcreateForm: boolean = false;
  @ViewChildren(CdkDropList) dropsQuery: QueryList<CdkDropList>;
  @Output() goBackTo = new EventEmitter();
  public collectionId: string;
  forms: CdkDropList[];
  public formList: FormsModel[] = [];
  breadcrumbCollection: string;
  breakpoint: number;
  constructor(private route: Router,
    private router: ActivatedRoute,
    private formBuilderApiService: FormBuilderApiService,
    private collectionApiService: CollectionsApiService,
    public loaderService: LoaderService,
    private toastMessageService: ToastMessageService,
    private cdref: ChangeDetectorRef,
    public dialog: MatDialog) {
    this.loaderService.setNoDataTemplate(false);
    this.collectionId = this.router.snapshot.params['collectionId'];
  }
  collectionForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
  });

  ngOnInit(): void {
    this.initializeData();
    this.breakpoint = window.innerWidth <= 767 ? 1 : 4;
    this.breakpoint = window.innerWidth <= 1023 ? 2 : 4;
    this.getAllForms();
    this.loaderService.setLoader(true);
    this.collectionApiService
      .getCollectionById(this.collectionId)
      .subscribe((response: any) => {
        this.breadcrumbCollection = response['result'].name;
        this.loaderService.setLoader(false);
        // this.toastMessageService.success('Collection Fetched Successfully')
      },
      (error) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed!')
      });
  }
  getAllForms():void{
    this.loaderService.setLoader(true);
    this.loaderService.setNoDataTemplate(false);
    this.formBuilderApiService
      .getForms(this.collectionId)
      .subscribe((response: any) => {
        if(response){
          if(!this.formList.length){

            this.loaderService.setNoDataTemplate(true);
          }
          this.formList = response;
          setTimeout(() => {
            
            this.loaderService.setLoader(false);
          }, 3000);
        }
        else{
          this.loaderService.setLoader(false);
          
        }
      },
      (error) => {
        this.loaderService.setLoader(false);
        this.toastMessageService.error('Failed To Fetch Forms!')
      });
  }
  entered($event: CdkDragEnter) {
    moveItemInArray(this.formList, $event.item.data, $event.container.data);
  }

  ngAfterViewInit() {
    this.dropsQuery.changes.subscribe(() => {
      this.forms = this.dropsQuery.toArray();
    });
    Promise.resolve().then(() => {
      this.forms = this.dropsQuery.toArray();
    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  save(): void {
  }

  public initializeData(): void {
  }
  
  onSubmit() {
    this.showcreateForm = false;
    this.collectionForm.reset();
  }
  onCancel() {
    this.showcreateForm = false;
    this.collectionForm.reset();
  }
  createCollection() {
    this.showcreateForm = true;
  }

  navigateToFormBuilder(id: string, formId: string): void {
    this.route.navigateByUrl(`form-builder/collections/${id}/forms/${formId}`);
  }
  navigateToNewFormBuilder() {
    this.route.navigateByUrl(`form-builder/collections/${this.collectionId}`);
  }
  goBack(): void {
    this.route.navigateByUrl(`/collections`);
  }

  showDeleteForm(form: any,event:Event){
    event.stopPropagation()
    const dialogRef = this.dialog.open(DeleteFormPopupComponent, {
      data: {
        collectionId: form.containerId,
        formId: form.id,
        formName: form.name
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getAllForms();
      }
    });
  }
}
