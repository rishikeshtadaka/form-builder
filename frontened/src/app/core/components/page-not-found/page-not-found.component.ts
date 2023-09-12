import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'cs-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(public loaderService: LoaderService, private route: Router) {}

  ngOnInit(): void {
    this.loaderService.setLoader(false);
  }
  backToHome() {
    this.route.navigateByUrl(``);
  }
}
