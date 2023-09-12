import { Component, OnInit, Inject,EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DrawerService } from '@core/services/drawer.service';
import { log } from 'console';
import { FormBuilderComponentEventEmitterService } from '../core/form-builder-component-event-emitter.service';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';

@Component({
  selector: 'cs-delete-component-popup',
  templateUrl: './delete-component-popup.component.html',
  styleUrls: ['./delete-component-popup.component.scss']
})
export class DeleteComponentPopupComponent implements OnInit {

  componentId: string;
  public deleteElement:EventEmitter<string>=new EventEmitter<string>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteComponentPopupComponent>,
    private drawerService: DrawerService,
    private formBuilderDomService: FormBuilderDomRegistryService,
    private formBuilderComponentEventEmitterService: FormBuilderComponentEventEmitterService
  ) { }

  ngOnInit(): void {
    this.componentId = this.data.componentId;
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  deleteComponent(){
    const list = document.getElementById(this.componentId);
    this.formBuilderDomService.deleteComponent(this.componentId);
    this.drawerService.close();
    list?.parentElement?.remove();
    this.deleteElement.emit(this.componentId);
  }
}
