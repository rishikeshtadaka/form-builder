export class JsonUtil {
  public static getJson(object: any): string {
    return JSON.stringify(object);
  }

  public static getObject(json: string): any {
    return JSON.parse(json);
  }
}
