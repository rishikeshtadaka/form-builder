import { Injectable, Injector } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { FormJsonModel } from "@core/model/form-json.model";
import { Observable } from "rxjs";
import { environment } from '@environments/environment';

@Injectable({providedIn:'root'})
export class FormBuilderApiService extends BaseApiService{
    constructor(injector:Injector){
        super(injector);
    }
    public getForms(collectionId:string):Observable<FormJsonModel>{
        return this.get(this.baseUrl+`/${collectionId}/forms`);
    }
    public getFormById(collectionId:string, formId: string):Observable<FormJsonModel>{
        return this.get(this.baseUrl+`/${collectionId}/forms/${formId}`);
    }
    public saveForm(collectionId:string, payload:FormJsonModel):Observable<FormJsonModel>{
        return this.post(this.baseUrl+`/${collectionId}/forms`,payload);
    }
    public updateForm(collectionId:string, formId: string, payload: FormJsonModel):Observable<FormJsonModel>{
        return this.put(this.baseUrl+`/${collectionId}/forms/${formId}`, payload);
    }
    public deleteForm(collectionId:string, formId: string){
        return this.delete(this.baseUrl+`/${collectionId}/forms/${formId}`);
    }
}