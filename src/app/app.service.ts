import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from './core/tools/interfaces/user';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  keys = {
    jwt: 'TOPWFC02GOVZ71CU8',
    jwtTime: 'TIR8ETWFV7QXOFRKE'
  };
  uri = environment.uri;
  limit = { jwt: 3600000, session: 172800000 };
  user: User = {};
  popupInfos = new Subject<{state: boolean, id: string, infos?: {}}>();
  sliderInfos = new Subject<{state: boolean, images: []}>();
  desktop = new Subject();
  constructor(private http: HttpClient, private router: Router) {}
  get(url) {
    return this.http.get(`${this.uri}/${url}`);
  }
  post(url, body) {
    return this.http.post(`${this.uri}/${url}`, body, {});
  }
  delete(url, id) {
    return this.http.delete(`${this.uri}/${url}/${id}`);
  }
  getUser() {
    const jwt = this.getJwt();
    return new Promise((resolve, reject) => {
      if (jwt) {
        this.get('auth/userInfos').subscribe((user: User) => {
          const { email, username } = user;
          if (email && username) {
            this.user = user;
            resolve(true);
          } else {
            this.user = {};
            resolve(false);
          }
        });
      } else {
        resolve(false);
      }
    });
  }
  setJwt(jwt) {
    localStorage.setItem(this.keys.jwt, jwt);
    localStorage.setItem(this.keys.jwtTime, String(Date.now()));
  }
  getJwt() {
    const time = localStorage.getItem(this.keys.jwtTime);
    if (time) {
      if (Date.now() - Number(time) < this.limit.jwt) {
        return localStorage.getItem(this.keys.jwt);
      }
      this.removeJwt();
    }
    return null;
  }
  removeJwt() {
    localStorage.removeItem(this.keys.jwt);
    localStorage.removeItem(this.keys.jwtTime);
  }
  goTo(path, options?) {
    const { params } = options || { params: null };
    if (params) {
      this.router.navigate([path], { queryParams: params }).catch();
    } else {
      this.router.navigate([path]).catch();
    }
  }
  setDesktop(value) {
    this.desktop.next(value);
  }
  getDesktop(): Observable<any> {
    return this.desktop.asObservable();
  }
}
