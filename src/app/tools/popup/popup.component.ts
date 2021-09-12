import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Popup } from '../interfaces/popup';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {
  popupSubs: Subscription;
  state: boolean;
  id: string;
  infos = {};
  constructor(private app: AppService) {
    this.popupSubs = app.popupInfos.subscribe((data: Popup) => {
      this.handlePopup(data);
    });
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.popupSubs.unsubscribe();
  }
  handlePopup(data: Popup) {
    const {state, id, infos } = data;
    this.state = state;
    this.id = id;
    this.infos = infos;
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
