import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {switchMap, take} from 'rxjs/operators';
import {User} from './user.model';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user: User) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().append('auth', user.token)
        });
        return next.handle(modifiedReq);
      }));
  }
}
