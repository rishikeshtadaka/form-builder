import { NgModule } from "@angular/core";
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [  
    FooterComponent,
    HeaderComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    PageNotFoundComponent
  ],
    imports: [RouterModule],
    providers: [],
    exports:[
      PublicLayoutComponent,
      PrivateLayoutComponent,
    ]
  })
export class CoreModule{

}