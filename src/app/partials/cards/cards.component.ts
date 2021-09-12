import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards = [
    {id: 'outlet', text: 'Outlets', date: '28/06/2017', status: 'on'},
    {id: 'camera', text: 'Camera', date: '28/06/2017', status: 'off'},
    {id: 'light', text: 'Lights', date: '28/06/2017', status: 'on'},
    {id: 'wifi', text: 'Wifi', date: '28/06/2017', status: 'off'},
    {id: 'thermostat', text: 'Thermostats', date: '28/06/2017', status: 'on'},
    {id: 'speaker', text: 'Speakers', date: '28/06/2017', status: 'off'},
  ];
  constructor() { }
  ngOnInit() {
  }
  changeStatus(index, status) {
    this.cards[index].status = status === 'on' ? 'off' : 'on';
  }
}
