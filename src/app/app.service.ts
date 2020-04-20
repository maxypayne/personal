import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './core/tools/interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  keys = {
    jwt: 'TOPWFC02GOVZ71CU8',
    jwtTime: 'TIR8ETWFV7QXOFRKE'
  };
  uri = 'http://localhost:3000';
  limit = { jwt: 3600000, session: 172800000 };
  user: User = {};
  popupInfos = new Subject<{state: boolean, id: string, infos?: {}}>();
  constructor(private http: HttpClient, private router: Router) {}
  get(url) {
    return this.http.get(`${this.uri}/${url}`);
  }
  post(url, body) {
    console.log(this.uri);
    return this.http.post(`${this.uri}/${url}`, body, {});
  }
  delete(url, id) {
    console.log(this.uri);
    return this.http.delete(`${this.uri}/${url}/${id}`);
  }
  setUser(user) {
    const { jwt, email } = user;
    jwt ? this.setJwt(jwt, email) : this.removeJwt();
  }
  setJwt(jwt, email) {
    localStorage.setItem(this.keys.jwt, jwt);
    localStorage.setItem(this.keys.jwtTime, String(Date.now()));
    this.user = { isLog: true, email};
    // this.user.next({ isLog: true });
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
    this.user.isLog = false;
  }
  goTo(path, options?) {
    console.log(path);
    const { params } = options || { params: null };
    if (params) {
      this.router.navigate([path], { queryParams: params }).catch();
    } else {
      this.router.navigate([path]).catch();
    }
  }
}
