import { Component, Injector } from "@angular/core";

@Component({
    template:''
})
export abstract class BaseComponent{

    constructor(protected injector:Injector){
        this.resolveAllDI();
    }

    private resolveAllDI():void{

    }
    
}