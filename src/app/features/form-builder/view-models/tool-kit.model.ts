export class ToolKitModel {
  constructor(
    public componentName: string,
    public componentDisplayName: string,
    public component: any
  ) {}
}

export class ToolKitListModel {
  public listToolKit: ToolKitModel[];
  constructor(listToolKit: ToolKitModel[] = []) {
    this.listToolKit = listToolKit;
  }
  public add(toolKit: ToolKitModel): void {
    this.listToolKit.push(toolKit);
  }
  public get(componentName: string): ToolKitModel | undefined {
    return this.listToolKit.find((t) => t.componentName === componentName);
  }
}
