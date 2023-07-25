import{HttpClient} from '@angular/common/http'
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
export abstract class BaseApiService{
    protected http:HttpClient;
    constructor(protected injector:Injector){
        this.resolveAllDI();
    }
    private resolveAllDI():void{
        this.http=this.injector.get(HttpClient);
    }

    protected get(url:string):Observable<any>{
        return this.http.get(url);
    }
    
    protected put(url:string,body:any):Observable<any>{
        return this.http.put(url,body);
    }
    
    protected post(url:string,body:any):Observable<any>{
        return this.http.post(url,body);
    }
    
    protected delete(url:string):Observable<any>{
        return this.http.delete(url);
    }

    protected deleteWithBody(url:string,body:any):Observable<any>{
        return this.http.delete(url,body);
    }
}