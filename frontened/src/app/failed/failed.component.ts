import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { LoaderService } from '@core/services/loader.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'login-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.scss'],
})
export class FailedComponent implements OnInit {
  constructor(
    private msalBroadcastService: MsalBroadcastService,
    public loaderService: LoaderService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loaderService.setLoader(false);
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE)
      )
      .subscribe((result: EventMessage) => {
        console.log('LOGIN_FAILURE:: ', result);
      });
  }
  backToHome() {
    this.route.navigateByUrl(``);
  }
}
