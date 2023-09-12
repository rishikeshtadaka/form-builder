import { Injectable } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";

@Injectable({providedIn:'root'})
export class SidenavService {
    private drawer1: MatDrawer;
    constructor(){
    }
    setDrawer(drawer: MatDrawer) {
    this.drawer1 = drawer;
    }
    toggle(): void {
    this.drawer1.toggle();
    }
}