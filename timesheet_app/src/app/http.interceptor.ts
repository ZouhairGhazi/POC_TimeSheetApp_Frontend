import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwt}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}