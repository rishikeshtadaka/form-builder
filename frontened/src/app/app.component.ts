import { MsalService } from '@azure/msal-angular';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'form-builder';
  public isLoading:boolean=true;
  public loaderSubscription : Subscription;

  constructor(private loaderService:LoaderService,private authService:MsalService){}

  ngOnInit(): void {
      this.loaderSubscription = this.loaderService.loaderEvent.subscribe((data)=>{
        setTimeout(()=>{this.isLoading = data;},0);
      });   
  }
  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }
}
