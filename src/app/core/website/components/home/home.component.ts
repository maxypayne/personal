import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-website-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WebsiteHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
