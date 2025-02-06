import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authTokenInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const token = localStorage.getItem('token');

  if (token !== null && request.headers.get('Authorization') === null) {
    const clonedRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next(clonedRequest);
  }

  return next(request);
}
