import { Injectable, EventEmitter } from '@angular/core';
import { FormJsonModel } from '@core/model/form-json.model';

@Injectable({
  providedIn: 'root'
})
export class ConditionalLogicDataService {

  localData: FormJsonModel
  dataEmitter: EventEmitter<FormJsonModel> = new EventEmitter<FormJsonModel>();
  constructor() { }

  updateData(data: FormJsonModel): void {
    this.localData = data
    this.dataEmitter.emit(data);
  }
  getUpdateData(){
    return this.dataEmitter
  }
}
