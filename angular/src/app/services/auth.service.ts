import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //baseUrl = 'http://localhost:3000';
  baseUrl = 'https://studenti.sum.ba/ifuaskme';
  constructor(private _http: HttpClient) {
}
login(username: string, password: string) {
  return this._http.post<any>(`${this.baseUrl}/users/authenticate`, { username: username, password: password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
          }

          return user;
      }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}
}