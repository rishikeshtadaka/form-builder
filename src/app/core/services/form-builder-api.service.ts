import { Injectable, Injector } from "@angular/core";
import { BaseApiService } from "./base-api.service";

@Injectable({providedIn:'root'})
export class FormBuilderApiService extends BaseApiService{
    constructor(injector:Injector){
        super(injector);
    }
}