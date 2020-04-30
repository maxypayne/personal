import { Component, HostListener, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontEndMentor';
  isResize: any;
  constructor(private app: AppService) {}
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
