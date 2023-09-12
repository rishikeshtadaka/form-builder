import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loaderEvent = new Subject<boolean>();
  public showNoDataTemplate:boolean=false;

  constructor() { }
  
  public setLoader(data:boolean){
    this.loaderEvent.next(data);
  }
  public getNoDataTemplate():boolean{
    return this.showNoDataTemplate;
  }
  public setNoDataTemplate(showNoData:boolean){
    this.showNoDataTemplate = showNoData;
  }
  

}
