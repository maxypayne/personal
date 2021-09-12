import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  cursorWhite: boolean;
  followers = [
    {id: 'facebook', username: 'nathanf', followers: '1987', today: 12},
    {id: 'twitter', username: 'nathanTw', followers: '1044', today: 99},
    {id: 'instagram', username: 'nathanIn', followers: '11k', today: 1099},
    {id: 'youtube', username: 'nathanYt', followers: '8324', today: -144},
  ];
  overviews = [
    { id: 'facebook', title: 'Page views', times: 87, percentage: 3 },
    { id: 'facebook', title: 'Likes', times: 52, percentage: -2 },
    { id: 'instagram', title: 'Likes', times: 1200, percentage: 1375 },
    { id: 'instagram', title: 'Page views', times: '54k', percentage: 2200 },
    { id: 'twitter', title: 'Page views', times: 117, percentage: 303 },
    { id: 'twitter', title: 'Likes', times: 507, percentage: 553 },
    { id: 'youtube', title: 'Page views', times: 107, percentage: -19 },
    { id: 'youtube', title: 'Likes', times: 87, percentage: -12 },
  ];
  constructor() { }

  ngOnInit() {
  }
  handleCursor() {
    this.cursorWhite = !this.cursorWhite;
  }
}
