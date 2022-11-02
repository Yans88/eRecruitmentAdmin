import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {MySessionService} from '../auth/my-session.service';
import {MessageService} from "primeng/api";

/*import Swal from 'sweetalert2/dist/sweetalert2.js';*/

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(private sessionService: MySessionService, private messageService: MessageService) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.sessionService.getSession() || this.sessionService.getToken()) {
      let headers = request.headers.set(
        'Authorization',
        `Bearer ${this.sessionService.getToken()}`
      );

      request = request.clone({
        headers: headers,
        body: request.body || {},
      });
    } else {
      request = request.clone({
        headers: request.headers.set('Authorization', ''),
        body: request.body || {},
      });
    }
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {
          reason: error && error.error && error.error.message ? error.error.message : '',
          status: error.status
        };
        this.messageService.add({severity: 'error', summary: 'Error', detail: data?.status + ': ' + data?.reason});
        console.log(error);
        return throwError(error);
      }));

  }

  /*private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 400) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: err?.status + ': ' + err?.error?.error});
    } else if (err.status === 401) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Username and password not match'});
    } else if (err.status === 500) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: err?.status + ': ' + err?.error?.error});
    }
    throw Error;
  }*/
}
