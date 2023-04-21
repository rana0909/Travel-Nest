import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface IUser {
  email: string;
  name: string;
  password: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  private _username$ = new BehaviorSubject<string>("");
  username$ = this._username$.asObservable();

  constructor(private http: HttpClient) {
    const myToken = localStorage.getItem('token');
    this._isLoggedIn$.next(!!myToken);
  }

  private loginUrl = 'http://localhost:5500/api/login';

  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(this.loginUrl, { email, password }).pipe(
      tap((response: any) => {
        console.log(response);
        this._isLoggedIn$.next(true);
        this._username$.next(response.name);
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.clear();
  }
}
