import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
  popupSubs: Subscription;
  state: boolean;
  id: string;
  images = [];
  constructor(private app: AppService) {
    this.popupSubs = app.sliderInfos.subscribe((data) => {
      this.handlePopup(data);
    });
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.popupSubs.unsubscribe();
  }
  handlePopup(data) {
    const {state, images } = data;
    this.state = state;
    this.images = images;
    console.log({images});
  }
  closePopup() {
    this.state = false;
  }
  clickPopup(target) {
    if (((target && target.className === 'popup')) && this.state) {
      this.closePopup();
    }
  }
}
