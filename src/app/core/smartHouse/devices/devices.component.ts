import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {
  devicesArr = [
    {id: 'device', text: 'Device' },
    {id: 'name', text: 'Name' },
    {id: 'location', text: 'Location' },
    {id: 'status', text: 'Status' },
    {id: 'battery', text: 'Battery' },
    {id: 'date', text: 'Date' },
  ];
  devices = [];
  isWiting: boolean;
  desktop: boolean;
  desktopSubsc: Subscription;
  constructor(private app: AppService) {
    this.desktopSubsc = app.desktop.subscribe(desktop => {
      this.desktop = desktop;
    });
  }
  ngOnDestroy(): void {
    this.desktopSubsc.unsubscribe();
  }
  ngOnInit() {
    this.isWiting = true;
    this.app.get('devices')
      .pipe(delay(1000))
      .subscribe(data => {
      if (data) {
        this.devices = data['devices'];
        this.isWiting = false;
      }
    });
  }
  changeStatus(index, status, id) {
    const changedStatus = status === 'on' ? 'off' : 'on';
    this.devices[index]['status'] = changedStatus;
    this.app.post('devices/update', {id, status: changedStatus})
      .subscribe(data => {
        console.log(data);
      });
  }
  addDevice() {
    this.app.popupInfos.next({state: true, id: 'device'});
  }
}
