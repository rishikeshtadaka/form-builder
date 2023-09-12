export class CollectionModel {
  public id: number;
  public name: string = '';
  public createdBy: string;
  public createdAt: string;
  public createdOn:string;
  public status: string = '';
  public description: string = '';
  public formId: number;
  public requestId: string;
  public forms = [];
  public backgroundColor: string = '';
  public fontFamily: string = '';
  public requestStatus?: string = '';
}

export const emptyCollectionObj = {
  name: '',
  id: 0,
  createdBy: '',
  createdAt: '',
  createdOn:'',
  status: '',
  description: '',
  formId: 0,
  requestId: '',
  forms: [],
  backgroundColor: '',
  fontFamily: '',
};
