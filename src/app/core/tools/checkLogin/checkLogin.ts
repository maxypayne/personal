import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppService } from '../../../app.service';

@Injectable({providedIn: 'root'})
export class CheckLogin implements CanActivate {
  constructor(private app: AppService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const isLog = this.app.getJwt();
    return isLog ? true : this.app.goTo('smarthouse/login');
  }
}
