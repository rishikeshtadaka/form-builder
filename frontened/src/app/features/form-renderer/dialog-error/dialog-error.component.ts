import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cs-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss']
})
export class DialogErrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public requiredElements: any[]) { }

  ngOnInit(): void {
    // console.log('requiredElements', this.requiredElements)
  }

}
