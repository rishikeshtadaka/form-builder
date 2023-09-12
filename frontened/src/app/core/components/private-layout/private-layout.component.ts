import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from '@shared/services/sidenav.service';

@Component({
  selector: 'cs-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent implements OnInit {
  
  @ViewChild('drawer1') public drawer1: MatDrawer;

  constructor(public sideNavService: SidenavService) { }

  ngOnInit(): void {
  }

  
  ngAfterViewInit(): void {
    this.sideNavService.setDrawer(this.drawer1);
  }

}
