import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  //TODO
  //constructor(private logger:LoggerService){}

  handleError(error: any): void {
    //this.logger.error("Error:",error
    console.error(`Charles Stanley=>`,error);
  }
}
