import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private sidenav: MatSidenav;

  constructor() { }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }


  public close() {

    return this.sidenav?this.sidenav.close():null;
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
