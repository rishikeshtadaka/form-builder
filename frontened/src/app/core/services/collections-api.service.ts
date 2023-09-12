import { Injectable, Injector } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { CollectionModel } from '@shared/view-models/collections.model';

@Injectable({
  providedIn: 'root',
})
export class CollectionsApiService extends BaseApiService {

  constructor(injector: Injector) {
    super(injector);
  }

  public getCollections(): Observable<CollectionModel> {
    return this.get(this.baseUrl);

  }

  public createCollection(payload: CollectionModel): Observable<CollectionModel> {
    return this.post(this.baseUrl, payload);

  }

  public getCollectionById(id: string): Observable<CollectionModel>{
    return this.get(this.baseUrl+`/${id}`);

  }
  
  public deleteCollection(id: number){
    return this.delete(this.baseUrl+`/${id}`);
  }
}
