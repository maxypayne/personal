import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlTree } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-smart-house',
  templateUrl: './smartHouse.component.html',
  styleUrls: ['./smarthouse.component.scss']
})
export class SmartHouseComponent implements OnInit {
  hideContent: boolean;
  showCards: boolean;
  activeRoute: string;
  constructor(private router: Router,private app: AppService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const eUrl = event.url;
        if (eUrl) {
          const arr = eUrl.split('/').filter(el => el);
          console.log(arr);
          this.hideContent = arr.includes('login') || arr.includes('signup');
          this.showCards = arr.includes('overview');
          this.activeRoute = arr[1];
        }
        console.log(this.hideContent);
        console.log(this.router.parseUrl(event.url));
      }
    });
  }
  ngOnInit() {
    const isLog = this.app.getJwt();
    if (isLog) {
      this.app.get('auth/userInfos').subscribe(data => {
        this.app.user.username = data['username'];
      });
    }
  }
}
