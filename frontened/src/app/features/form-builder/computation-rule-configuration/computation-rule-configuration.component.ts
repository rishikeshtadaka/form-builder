import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComputationConfigurationModel } from '@core/model/computation-configuration.model';
import { FormBuilderComponentEventEmitterService } from '../core/form-builder-component-event-emitter.service';
import { FormBuilderDomRegistryService } from '../core/form-builder-dom-registry.service';
import { BaseElementConfigurationsComponent } from '../element-configurations/base-element-configurations.component';

@Component({
  selector: 'cs-computation-rule-configuration',
  templateUrl: './computation-rule-configuration.component.html',
  styleUrls: ['./computation-rule-configuration.component.scss']
})
export class ComputationRuleConfigurationComponent 
extends BaseElementConfigurationsComponent<ComputationConfigurationModel>
implements OnInit {
  submitted = false;
  computationForm: FormGroup;
  public filtered: any;
  public componentsName: any;
  public componentIds: any;
  public computationObject = new ComputationConfigurationModel()

  constructor(@Inject(MAT_DIALOG_DATA) public data: ComputationConfigurationModel,
  private fb: FormBuilder,
  private formBuilderComponentEventEmitterService: FormBuilderComponentEventEmitterService,
  public formBuilderDomService: FormBuilderDomRegistryService,
  public dialogRef: MatDialogRef<ComputationRuleConfigurationComponent>) {
    super();
    this.computationForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      firstField: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      operator: new FormControl('', [Validators.required]),
      secondField: new FormControl('', [Validators.required]),
    });
    this.filtered =
      this.formBuilderDomService.getAllNumericExceptProvidedComponentId(
        this.formBuilderComponentEventEmitterService
          .currentConfigurationElementId
      );

    this.componentsName = [...this.filtered.values()];
    this.componentIds = [...this.filtered.keys()];
   }

   get computationFormControls(): any {
    return this.computationForm['controls'];
 }
  ngOnInit(): void {
    if(this.data){
      this.computationObject=this.data;
    }
  }
  saveComputation(){
    this.submitted=true;
    if(this.computationForm.valid){
      this.formBuilderComponentEventEmitterService.emitSetComputation(
        this.computationObject
      );
      this.dialogRef.close();
    }
    else{
      this.computationForm.markAllAsTouched();
    }
    
  }
}
