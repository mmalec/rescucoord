import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private isDebugMode = true;

  log(message: any) {
    if (this.isDebugMode) {
      console.log(message);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(message, ...optionalParams);
  }

  // Możesz dodać więcej metod dla różnych poziomów logowania, jeśli jest to potrzebne
}
