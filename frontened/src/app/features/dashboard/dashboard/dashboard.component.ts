import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'cs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  breakpoint: number;
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 767) ? 1 : 4;
    this.breakpoint = (window.innerWidth <= 1023) ? 2 : 4;
  }

  navigateToNewFormBuilder(){
    this.route.navigateByUrl(``);
   }

}
