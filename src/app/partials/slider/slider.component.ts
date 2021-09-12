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
  marginLeft = 0;
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
    this.marginLeft = 0;
  }
  clickSlider(target) {
    if (((target && target.id === 'slider')) && this.state) {
      this.closePopup();
    }
  }
  handleFleche(where) {
    if (where === 'next') {
      this.marginLeft = this.marginLeft === -(this.images.length - 1) * 700 ? 0 : this.marginLeft  -= 700;
    } else if (where === 'prev') {
      this.marginLeft = this.marginLeft === 0 ? -(this.images.length - 1) * 700  : this.marginLeft += 700;
    }
  }
}
