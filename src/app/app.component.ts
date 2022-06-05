import { Component, HostListener, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isResize: any;
  constructor(private app: AppService, private title: Title, private meta: Meta) {
    this.title.setTitle('Maxim Lucov : Développeur Web');
  }
  ngOnInit(): void {
    this.getWidth();
  }
  @HostListener('window:resize')
  onResize() {
    clearTimeout(this.isResize);
    this.isResize = setTimeout(() => {
      this.getWidth();
    }, 200);
  }
  getWidth() {
    this.app.setDesktop(window.innerWidth > 1024);
  }
}
