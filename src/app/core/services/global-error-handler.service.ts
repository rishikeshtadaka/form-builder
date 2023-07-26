import { ErrorHandler } from '@angular/core';
import { LoggerService } from './logger.service';

export class GlobalErrorHandler implements ErrorHandler {
  //TODO
  //constructor(private logger:LoggerService){}

  handleError(error: any): void {
    //this.logger.error("Error:",error); //TODO
    console.error(`Charles Stanley=> ${error}`);
  }
}