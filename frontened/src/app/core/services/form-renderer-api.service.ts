import { Injectable, Injector } from "@angular/core";
import { FormJsonModel } from "@core/model/form-json.model";
import { JsonUtil } from "@shared/utils/json-util";
import { Observable, of } from "rxjs";
import { BaseApiService } from "./base-api.service";
import { environment } from "@environments/environment";
import { FormResponseWrapperModel } from "@core/model/form-response.model";

@Injectable({ providedIn: 'root' })
export class FormRendererApiService extends BaseApiService {
    constructor(injector: Injector) {
        super(injector);
    }

    // public getFormJson():Observable<FormJsonModel>{
    //     //return this.get("https://csonboard-form.azurewebsites.net/api/v1/forms");
    //     return of(this.getDummyData());
    // }

    // private getDummyData():FormJsonModel{
    //     let json=`{"name":"Application Form","Id":"","elements":[{"id":"CS_Element_1691675204605","type":"cs-section","configurations":{"name":"Section 1","id":"section 1"},"elements":[{"id":"CS_Element_1691742951583","type":"cs-row","configurations":{"numberOfColumns":2},"elements":[{"id":"CS_Element_1691742959523","type":"cs-radio-button","configurations":{"label":"Single Selection","componentType":"Radiobutton","items":["Abc","XYZ"]},"elements":[]},{"id":"CS_Element_1691742961042","type":"cs-checklist","configurations":{"label":"Multiple Selection","componentType":"Checklist","items":["ABC","XYZ"]},"elements":[]}]},{"id":"CS_Element_1691742996994","type":"cs-label","configurations":{"placeholder":"Label"},"elements":[]},{"id":"CS_Element_1691742999460","type":"cs-text-box","configurations":{"required":false,"charachterLength":20,"disable":false,"label":"Short Text"},"elements":[]},{"id":"CS_Element_1691743002569","type":"cs-number-box","configurations":{"inputType":"number","required":false,"charachterLength":20,"disable":false,"label":"Number"},"elements":[]},{"id":"CS_Element_1691743005203","type":"cs-dropdown-list","configurations":{"label":"Dropdown","componentType":"Dropdown","items":[]},"elements":[]},{"id":"CS_Element_1691743008084","type":"cs-checklist","configurations":{"label":"Multiple Selection","componentType":"Checklist","items":[]},"elements":[]}]}]}`;
    //     //let json=`{"name":"Form Name","elements":[{"id":"","type":"cs-text-box","configurations":{"required":false,"disable":"false","label":"Text","placeholder":"abcds","name":"","inputType":"text"},"childrens":[]}]}`;
    //     return JsonUtil.getObject(json);
    // }
    public getFormById(collectionId: string, formId: string): Observable<FormJsonModel> {
        return this.get(this.baseUrl + `/${collectionId}/forms/${formId}`);
    }
    public saveResponse(collectionId: string, payload: any): Observable<FormJsonModel> {
        return this.post(this.baseUrl + `/${collectionId}/requests`, payload)
    }
    public updateResponse(requestId: string, payload: any): Observable<FormJsonModel> {
        return this.put(environment.apiUrl + `/requests/${requestId}`, payload)
    }
    public getAllRequests(): Observable<any> {
        return this.get(environment.apiUrl + `/requests`);
    }
    public getRequestById(requestId: string): Observable<FormResponseWrapperModel> {
        return this.get(environment.apiUrl + `/requests/${requestId}`);
    }
    // public getFormReqById(requestId:string,collectionId:string){
    //     return this.get(this.baseUrl+`/${collectionId}/requests/${requestId}`);
    // }
    public getDummyData(): any {
        let response = {
            "id": "e3d06fdf-8d4b-4b61-af53-15b2fe694154",
            "containerId": "750a919b-eb9d-419e-b499-5dd06ad1b5d2",
            "name": "Form test",
            "elements": [
                {
                    "id": "CS_Element_1693314629727",
                    "type": "cs-section",
                    "elements": [
                        {
                            "id": "CS_Element_1693314640553",
                            "type": "cs-radio-button",
                            "elements": null,
                            "configurations": {
                                "general": {
                                    "label": "Adhaar",
                                    "type": "Radiobutton",
                                    "items": [
                                        "Yes",
                                        "No"
                                    ],
                                    "required": false,
                                    "disable": false,
                                    "name": "_Name_1693314640558"
                                },
                                "visibility": [],
                                "validation": [],
                                "computation": []
                            }
                        },
                        {
                            "id": "CS_Element_1693314671831",
                            "type": "cs-radio-button",
                            "elements": null,
                            "configurations": {
                                "general": {
                                    "label": "Pan card",
                                    "type": "Radiobutton",
                                    "items": [
                                        "Yes",
                                        "No"
                                    ],
                                    "required": false,
                                    "disable": false,
                                    "name": "_Name_1693314671835"
                                },
                                "visibility": [],
                                "validation": [],
                                "computation": []
                            }
                        },
                        {
                            "id": "CS_Element_1693315120741",
                            "type": "cs-radio-button",
                            "elements": null,
                            "configurations": {
                                "general": {
                                    "label": "Driving License",
                                    "type": "Radiobutton",
                                    "items": [
                                        "Yes",
                                        "No"
                                    ],
                                    "required": false,
                                    "disable": false,
                                    "name": "_Name_1693315120747"
                                },
                                "visibility": [],
                                "validation": [],
                                "computation": []
                            }
                        },
                        {
                            "id": "CS_Element_1693315117862",
                            "type": "cs-radio-button",
                            "elements": null,
                            "configurations": {
                                "general": {
                                    "label": "Passport",
                                    "type": "Radiobutton",
                                    "items": [
                                        "Yes",
                                        "No"
                                    ],
                                    "required": false,
                                    "disable": false,
                                    "name": "_Name_1693315117868"
                                },
                                "visibility": [],
                                "validation": [],
                                "computation": []
                            }
                        },
                        {
                            "id": "CS_Element_1693314699494",
                            "type": "cs-radio-button",
                            "elements": null,
                            "configurations": {
                                "general": {
                                    "label": "Adhar-Pan Link",
                                    "type": "Radiobutton",
                                    "items": [
                                        "Yes",
                                        "No"
                                    ],
                                    "required": false,
                                    "disable": false,
                                    "name": "_Name_1693314699504"
                                },
                                "visibility": [
                                    {
                                        "expressions": [
                                            [
                                                {
                                                    "sourceElementId": "CS_Element_1693314640553",
                                                    "operator": "et",
                                                    "value": "Yes",
                                                    "condition": "if",
                                                    "type": "Radiobutton"
                                                },
                                                {
                                                    "sourceElementId": "CS_Element_1693314671831",
                                                    "operator": "et",
                                                    "value": "Yes",
                                                    "condition": "AND",
                                                    "type": "Radiobutton"
                                                }
                                            ],[
                                                {
                                                    "operator": "AND"
                                                }
                                            ],
                                            [
                                                {
                                                    "sourceElementId": "CS_Element_1693314640553",
                                                    "operator": "et",
                                                    "value": "No",
                                                    "condition": "if",
                                                    "type": "Radiobutton"
                                                },
                                                {
                                                    "sourceElementId": "CS_Element_1693314671831",
                                                    "operator": "et",
                                                    "value": "Yes",
                                                    "condition": "AND",
                                                    "type": "Radiobutton"
                                                }
                                            ],
                                            [
                                                {
                                                    "operator": "AND"
                                                }
                                            ],
                                            [
                                                {
                                                    "sourceElementId": "CS_Element_1693315117862",
                                                    "operator": "et",
                                                    "value": "Yes",
                                                    "condition": "OR",
                                                    "type": "Radiobutton"
                                                },
                                                {
                                                    "sourceElementId": "CS_Element_1693315120741",
                                                    "operator": "et",
                                                    "value": "Yes",
                                                    "condition": "OR",
                                                    "type": "Radiobutton"
                                                }
                                            ]
                                        ],
                                        "name": "Adhar-Pan VR",
                                        "description": "Adhar-Pan VR",
                                        "action": "show",
                                        "elementId": "CS_Element_1693314699494",
                                        "visibilityRuleId": "CS_Visibility_Rule_1693314796846"
                                    }
                                ],
                                "validation": [],
                                "computation": []
                            }
                        }
                    ],
                    "configurations": {
                        "general": {
                            "label": "Section 1",
                            "name": "_Name_1693314629728",
                            "id": "section 1",
                            "internal": false
                        },
                        "visibility": [],
                        "validation": [],
                        "computation": []
                    }
                }
            ],
            "createdAt": "2023-08-29T13:26:42.6975056Z",
            "updatedAt": "2023-08-29T13:26:42.6975074Z",
            "isDeleted": false
        }
        return response;
    }
    public getFormCollectionForms(collectionId:string):Observable<FormJsonModel[]>{
        return this.get(this.baseUrl+`/${collectionId}/forms`);
    }
    public saveCollectionResponse(payload:any):Observable<FormJsonModel>{
        return this.post(this.baseRequestUrl+`/requests`,payload)
    }
    public updateCollection(collectionId:string,payload:any):Observable<FormJsonModel>{
        return this.put(this.baseUrl+`/${collectionId}`,payload)
    }

    public apiCall(url: string, type?: string, payload?: any, header: any = {}): Observable<any> {
        if (type?.toLowerCase() == 'post') {
            return this.post(url, payload);
        }
        return this.get(url);
    }

}