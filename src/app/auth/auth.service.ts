import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = new BehaviorSubject<User>(null);
  logoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError), tap(this.handleAuthentication.bind(this)));
  }

  private handleAuthentication(responseData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + Number(responseData.expiresIn) * 1000);
    const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
    this.user$.next(user);
    this.autoLogout(Number(responseData.expiresIn) * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user$.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.logoutTimer) {
      clearInterval(this.logoutTimer);
    }
  }

  autoLogout(expirationTime: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError), tap(this.handleAuthentication.bind(this)));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (user.token) {
      this.user$.next(user);
      this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
    }
  }

  private handleError(errorResponse: any) {
    let errorMessage = 'Unknown error occurred';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    console.log(errorResponse.error.error.message);
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists, please use another one';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong password';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email you have provided does not exist';
    }
    return throwError(errorMessage);
  }
}
