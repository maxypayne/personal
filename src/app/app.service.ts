import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from "./tools/interfaces/user";
@Injectable({
  providedIn: 'root',
})
export class AppService {
  keys = {
    jwt: 'TOPWFC02GOVZ71CU8',
    jwtTime: 'TIR8ETWFV7QXOFRKE'
  };
  uri = environment.uri;
  sliderInfos = new Subject<{state: boolean, images: []}>();
  environment = environment;
  iframeInit = false;
  screenWidthInit: number;
  desktopInit = false;
  routeIdInit: string;
  formatWebp = true;
  paramsInit = {};
  user: User = {};
  userInit: User = {};
  loginInfos: User = {};
  screenWidth = new Subject<number>();
  desktop = new Subject<boolean>();
  routeId = new Subject<string>();
  params = new Subject<any>();
  scrollToTop = new Subject<null>();
  goToCommandes = new Subject<null>();
  handleFleche = new Subject<null>();
  data = {};
  limit = { jwt: 3600000, session: 172800000 };
  isLog: Promise<boolean>;
  popupInfos = new Subject<{state: boolean, id: string, infos?: {}, reload?: string}>();
  popupDeletePl = new Subject<number>();
  popupScroll = new Subject<{pageY: number, screenY: number}>();
  stopScroll = new Subject<boolean>();
  personnalisationPl = new Subject<any>();
  personnalisationEnter = new Subject<null>();
  closeCookies = new Subject<null>();
  ecdg: { [p: string]: string };
  changeRegions = new Subject<any>();
  stepsGtm = {
    services: [0, { CG: '1', CGPL: '1', PL: '1' }],
    demarches: [3, { CG: '2', CGPL: '2' }],
    scooter: [3, { CG: '2', CGPL: '2' }],
    etat: [4, { CG: '3', CGPL: '3' }],
    immat: [5, { CG: '3', CGPL: '3' }],
    vehicule: [6, { CG: '3', CGPL: '3' }],
    complement: [7, { CG: '3', CGPL: '3' }],
    personnalisation: [8, { CGPL: '4', PL: '2' }],
    identification: [9, { CG: '4', CGPL: '5', PL: '3' }],
    paiement: [10, { CG: '5', CGPL: '6', PL: '4' }],
    postPaiement: [11, { CG: '5', CGPL: '6', PL: '4' }],
  };
  idsPushGtm = [
    'haveAccount', 'bonjourPro', 'noPlaqueVerif', 'numeroPlaque', 'addPl', 'updatePl', 'deletePl', 'sendNewCode', 'gotIt',
  ];
  idsValueGtm = [
    'serviceCg', 'servicePl', 'demarche', 'etatVehicule', 'format', 'materiau', 'fixation',
    'departement', 'personnalisation', 'quantite', 'statutContact', 'typeLivraison', 'typePaiement',
  ];
  constructor(private http: HttpClient, private router: Router) {}
  get(url) {
    return this.http.get(`${this.uri}/${url}`);
  }
  post(url, body) {
    console.log(url)
    return this.http.post(`${this.uri}/${url}`, body, {});
  }
  delete(url, id) {
    return this.http.delete(`${this.uri}/${url}/${id}`);
  }
  getUser() {
    const jwt = this.getJwt();
    return new Promise((resolve) => {
      if (jwt) {
        this.api('get', '/check/isLog')
          .then((data) => {
            if (data.isLog) {
              this.setLoginInfos(data);
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(() => {
            resolve(false);
          });
      } else {
        resolve(false);
      }
    });
  }
  // setWaitApp(state: boolean, from) {
  //   if (state) {
  //     this.startWaitApp = Date.now();
  //     this.activateWaitApp = true;
  //     this.waitApp = true;
  //   } else {
  //     const delai = Date.now() - this.startWaitApp;
  //     if (delai > 500) {
  //       this.waitApp = false;
  //     } else {
  //       setTimeout(() => { this.waitApp = false; }, 500 - delai);
  //     }
  //     clearTimeout(this.timeoutWaitApp);
  //     this.timeoutWaitApp = setTimeout(() => { this.activateWaitApp = false; }, 500);
  //   }
  // }
  setScreenWidth(width: number) {
    this.screenWidthInit = width;
    this.screenWidth.next(width);
  }
  setDesktop(desktop: boolean) {
    this.desktopInit = desktop;
    this.desktop.next(desktop);
  }
  setRouteId(routeId) {
    this.routeIdInit = routeId || null;
    this.routeId.next(routeId || null);
  }
  setParams(params) {
    this.paramsInit = params || {};
    this.params.next(params || {});
  }
  // setUser(user: User) {
  //   const { logins, jwt, ...rest } = user;
  //   logins ? this.setLogins(logins) : this.removeLogins();
  //   jwt ? this.setJwt(jwt) : this.removeJwt();
  //   this.user = { logins, isLog: !!jwt, ...rest };
  //   this.isLog = Promise.resolve(this.user.isLog);
  // }
  setJwt(jwt) {
    localStorage.setItem(this.keys.jwt, jwt);
    localStorage.setItem(this.keys.jwtTime, String(Date.now()));
  }
  getJwt() {
    return localStorage.getItem(this.keys.jwt);
  }
  removeJwt() {
    localStorage.removeItem(this.keys.jwt);
    localStorage.removeItem(this.keys.jwtTime);
  }
  // setLogins(logins) {
  //   localStorage.setItem(this.keys.logins, logins);
  //   localStorage.setItem(this.keys.loginsTime, String(Date.now()));
  // }
  // getLogins() {
  //   const time = localStorage.getItem(this.keys.loginsTime);
  //   if (time) {
  //     if (Date.now() - Number(time) < this.limit.jwt) {
  //       return localStorage.getItem(this.keys.logins);
  //     }
  //     this.removeLogins();
  //   }
  //   return null;
  // }
  // removeLogins() {
  //   localStorage.removeItem(this.keys.logins);
  //   localStorage.removeItem(this.keys.loginsTime);
  // }
  //
  //
  // TODO SEPARATE
  //
  //
  // updateUser(user: User) {
  //   this.userInit = { ...this.userInit, ...user };
  //   this.isLog = Promise.resolve(this.userInit.isLog);
  //   this.user.next({ ...this.userInit, ...user });
  // }
  // setBeforeRedirect(url, params) {
  //   localStorage.setItem(this.keys.beforeRedirect, btoa(url));
  //   if (params) {
  //     localStorage.setItem(this.keys.beforeRedirect2, btoa(JSON.stringify(params)));
  //   }
  // }
  // getBeforeRedirect() {
  //   try {
  //     const path = localStorage.getItem(this.keys.beforeRedirect);
  //     const params = localStorage.getItem(this.keys.beforeRedirect2);
  //     if (path) {
  //       localStorage.removeItem(this.keys.beforeRedirect);
  //       localStorage.removeItem(this.keys.beforeRedirect2);
  //       return { path: atob(path), params: params ? JSON.parse(atob(params)) : null };
  //     }
  //   } catch (e) {}
  //   return null;
  // }
  // setSession(sessionId) {
  //   localStorage.setItem(this.keys.session, sessionId);
  //   localStorage.setItem(this.keys.sessionTime, String(Date.now()));
  // }
  // getSession() {
  //   const time = localStorage.getItem(this.keys.sessionTime);
  //   if (time) {
  //     if (Date.now() - Number(time) < this.limit.session) {
  //       return localStorage.getItem(this.keys.session);
  //     }
  //     this.removeSession();
  //   }
  //   return null;
  // }
  // removeSession() {
  //   localStorage.removeItem(this.keys.session);
  //   localStorage.removeItem(this.keys.sessionTime);
  // }
  handleChangeVal(action, data: {}, check: {}, fields: string[]) {
    const { id, cleaned, checked } = action || { id: null, cleaned: null, checked: false };
    if (id) {
      check[id] = checked;
      data[id] = cleaned;
    }
    return { data, check, state: this.checkBtn(fields, check), error: { [id]: !checked } };
  }
  checkBtn(fields: string[], check: {}) {
    if (fields && fields.length > 0) {
      let error = 0;
      fields.forEach((field) => {
        if (!check[field]) {
          error += 1;
        }
      });
      return !error;
    }
    return false;
  }
  checkBtnMain(data: object[], btn: boolean[]) {
    if (data && data.length > 0) {
      let error = 0;
      data.forEach((field, i) => {
        if (!btn[i]) {
          error += 1;
        }
      });
      return !error;
    }
    return false;
  }
  async api(method, path, body?) {
    let buildReq;
    const options = new HttpHeaders({ 'Content-Type': 'application/json', token: this.getJwt() || '' });
    const headers = { headers: options };
    if (method === 'get') {
      buildReq = this.http.get(this.uri, headers);
    } else if (method === 'post') {
      buildReq = this.http.post(this.uri, body, headers);
    } else if (method === 'put') {
      buildReq = this.http.put(this.uri, body, headers);
    }
    if (buildReq) {
      return buildReq.toPromise().catch(err => Promise.reject(this.handleCode(err)));
    }
  }
  // uploadFichiers(body) {
  //   const headers = new HttpHeaders({ token: this.getJwt() || '' });
  //   return this.http.post(`${this.environment.path2}/create/fichiers`, body, { headers });
  // }
  handleCode(err) {
    if (err.status === 405 || err.status === 401) {
      this.logout();
      return null;
    }
    return err;
  }
  goTo(path, params?) {
    if (params) {
      this.router.navigate([path], { queryParams: params }).catch();
    } else {
      this.router.navigate([path]).catch();
    }
  }
  logout() {
    // this.setUser({});
    this.goTo('/');
  }
  setLoginInfos(data) {
    this.loginInfos = { ...this.loginInfos, ...data, ...data ? data.counts : {}};
  }
  sortArr(key, x, y) {
    if (x[key]) { return -1; }
    if (x[key] !== y[key]) { return 1; }
    return 0;
  }
}
