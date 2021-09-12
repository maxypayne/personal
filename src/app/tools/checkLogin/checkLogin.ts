import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppService } from "../../app.service";

@Injectable({providedIn: 'root'})
export class CheckLogin implements CanActivate {
  constructor(private app: AppService) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    let userExists;
    await this.app.getUser().then(res => {
      userExists = res;
    });
    return userExists ? true : this.app.goTo('smarthouse/login');
  }
}
