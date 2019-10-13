import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any) {
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      alert(`
        Request to URL: ${router.url}

        Backend returned status code: ${error.status}

        Response body: ${error.message}
      `);
    } else {
      alert(`An error occured: ${error.message}`);
    }

    router.navigate(['/']);
  }
}
