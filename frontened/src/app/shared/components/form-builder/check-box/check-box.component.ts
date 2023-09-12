import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cs-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {

  
  public displayOptions: boolean = false;
  public optionName: string = 'Option One';
  checkBoxItems: string[] = ['Male', 'Female'];

  listItemsForm: FormGroup;

  constructor() {  }

  ngOnInit(): void {
  }

  public getJson(): any {
    return {
      width: 200,
      checkBoxValues: this.checkBoxItems
    };
  }
  public setJson(json: any): void {
    this.checkBoxItems = json['checkBoxValues']

  }


}
