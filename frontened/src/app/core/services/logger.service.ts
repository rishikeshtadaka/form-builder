import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  constructor(private ngxLogger: NGXLogger) {}

  private shouldLog(level: NgxLoggerLevel): boolean {
    if (level >= environment.logLevel && level !== NgxLoggerLevel.OFF) {
      return true;
    }
    return false;
  }

  private getMessage(message: string): string {
    return `Charles Stanley:${message}`;
  }

  log(message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(NgxLoggerLevel.LOG))
      this.ngxLogger.log(this.getMessage(message), optionalParams);
  }

  trace(message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(NgxLoggerLevel.TRACE))
      this.ngxLogger.trace(this.getMessage(message), optionalParams);
  }

  info(message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(NgxLoggerLevel.INFO))
      this.ngxLogger.info(this.getMessage(message), optionalParams);
  }

  warn(message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(NgxLoggerLevel.WARN))
      this.ngxLogger.warn(this.getMessage(message), optionalParams);
  }

  error(message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(NgxLoggerLevel.ERROR))
      this.ngxLogger.error(this.getMessage(message), optionalParams);
  }

  fatal(message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(NgxLoggerLevel.FATAL))
      this.ngxLogger.fatal(this.getMessage(message), optionalParams);
  }
}
