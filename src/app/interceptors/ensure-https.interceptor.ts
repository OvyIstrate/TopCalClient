import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable()
export class EnsureHttpsInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const secureReq = request.clone({
            url: request.url.replace('http://', 'https://')
          });
          // send the cloned, "secure" request to the next handler.
          return next.handle(secureReq);
    };
}