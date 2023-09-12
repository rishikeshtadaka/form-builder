import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
export abstract class BaseApiService {
    baseUrl = environment.apiUrl+`/collections`;
    baseRequestUrl = environment.apiUrl;
    protected headers = new Headers({
        'x-auth-token': environment.xAuthToken,
    });
    protected http: HttpClient;
    constructor(protected injector: Injector) {
        this.resolveAllDI();
    }
    private resolveAllDI(): void {
        this.http = this.injector.get(HttpClient);
    }

    createAuthorizationHeader() {
        let headers = new HttpHeaders().append('x-auth-token', environment.xAuthToken);
        return headers;
    }

    protected get(url: string): Observable<any> {
        return this.http.get(url, { headers: this.createAuthorizationHeader() });
    }

    protected put(url: string, body: any): Observable<any> {
        return this.http.put(url, body, { headers: this.createAuthorizationHeader() });
    }

    protected post(url: string, body: any): Observable<any> {
        return this.http.post(url, body, { headers: this.createAuthorizationHeader() });
    }

    protected delete(url: string): Observable<any> {
        return this.http.delete(url, { headers: this.createAuthorizationHeader() });
    }

    //not able to add headers here
    protected deleteWithBody(url: string, body: any): Observable<any> {
        return this.http.delete(url, body);
    }
}