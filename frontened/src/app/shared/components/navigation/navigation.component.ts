import { Component, ElementRef, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from '@environments/environment';

import { SidenavService } from '@shared/services/sidenav.service';

@Component({
  selector: 'cs-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('drawer1') drawer1: ElementRef;
  env = environment;
  constructor(
    private authService: MsalService,
    public sideNavService: SidenavService
  ) { }

  ngOnInit(): void {
  }

  toggleDrawer(): void {
    this.sideNavService.toggle();
  }

  logout() {
    this.authService.logoutRedirect();
  }
}
