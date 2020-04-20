import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  menu = [
    {id: 'living', text: 'C1'},
    {id: 'studio', text: 'C2'},
    {id: 'bedroom', text: 'C3'},
    {id: 'cave', text: 'C4'},
    {id: 'kitchen', text: 'C5'},
  ];
  roomConsuption = [
    {id: 'living', text: 'Living Room', percentage: '16%'},
    {id: 'studio', text: 'Studio', percentage: '22%'},
    {id: 'bedroom', text: 'Daisy\'s Bedroom', percentage: '11%'},
    {id: 'cave', text: 'Cellar', percentage: '39%'},
    {id: 'kitchen', text: 'Kitchen', percentage: '12%'},
  ];
  active = 'living';
  days = [
    {day: 'MON', height: 26, color: 'gray'},
    {day: 'TUE', height: 54, color: 'blue'},
    {day: 'WED', height: 76, color: 'blue'},
    {day: 'THU', height: 46, color: 'gray'},
    {day: 'FRI', height: 50, color: 'blue'},
    {day: 'SAT', height: 32, color: 'blue'},
    {day: 'SUN', height: 20, color: 'blue'},
  ];
  units = [
    {id: 'living', text: 'ON LIVING', value: 745, unit: 'W', flecheStatus: 'top'},
    {id: 'inside', text: 'INSIDE', value: 15.3, unit: '°F', flecheStatus: 'top'},
    {id: 'outside', text: 'OUTSIDE', value: 20, unit: '°F', flecheStatus: 'bottom'},
    {id: 'water', text: 'WATER', value: 494, unit: '°CF', flecheStatus: 'top'},
    {id: 'internet', text: 'INTERNET', value: 45.3, unit: 'MBPS', flecheStatus: 'bottom'},
  ];
  constructor() { }
  ngOnInit() {
    // this.createChart();
  }
  createChart() {
    const chart: any = document.getElementById('myChart');
    const ctx = chart.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          // label: '# of Votes',
          data: [22, 11, 12, 39, 16],
          backgroundColor: ['#FFAB4F', '#EE423D', '#843FA0', '#1F8EFA', '#05C985'],
          borderColor: ['#FFAB4F', '#EE423D', '#843FA0', '#1F8EFA', '#05C985'],
          borderWidth: 2
        }]
      },
      options: {
        cutoutPercentage: 70,
      }
    });
    chart.style.height = '134px';
    chart.style.width = '134px';
  }
  handleCamera(value) {
    this.active = value;
  }
}
