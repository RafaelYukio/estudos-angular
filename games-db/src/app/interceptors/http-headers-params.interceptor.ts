import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersParamsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        // Aqui eu poderia colocar dados no header para todas as requisições
      },
      setParams: {
        // Aqui eu poderia colocar dados de parâmetros para todas as requisições
      },
    });

    return next.handle(req);
  }
}
