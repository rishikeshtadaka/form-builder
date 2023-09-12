export class FormResponseModel{
    public name:string;
    public value:any;
}

export class FormResponseResultModel{
    public responses:FormResponseModel[];
    public forms:string[];
    public collectionId:string;
    public status:string;
    public updatedOn:string;
    public id:string;
}

export class FormResponseWrapperModel{
    public result:FormResponseResultModel;
}