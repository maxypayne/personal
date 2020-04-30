import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppService } from '../../../app.service';

@Injectable({providedIn: 'root'})
export class CheckLogin implements CanActivate {
  constructor(private app: AppService) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    // const isLog = this.app.getJwt();
    let userExists;
    await this.app.getUser().then(res => {
      userExists = res;
    });
    return userExists ? true : this.app.goTo('smarthouse/login');
  }
}
