import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  years = ['2017', '2018', '2019', '2020'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monts31 = ['January', 'March', 'May', 'July', 'August', 'October', 'December'];
  monts30 = ['February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  images = [];
  monthLabels = [];
  allImages = [];
  hideYears: boolean;
  activeRow: number;
  constructor(private app: AppService) { }
  ngOnInit() {
    this.getImages();
  }
  creatRandomMonth(day) {
    let month;
    if (day === 31) {
      const index = Math.floor(Math.random() * this.monts31.length);
      month = this.monts31[index];
    } else if (day === 28) {
      month = 'February';
    } else if (day <= 30) {
      const index = Math.floor(Math.random() * this.monts30.length);
      month = this.monts30[index];
    }
    return month;
  }
  createRandomDay() {
    return Math.floor(Math.random() * 31) + 1;
  }
  createRandomYear() {
    const index = Math.floor(Math.random() * this.years.length);
    return this.years[index];
  }
  getTime() {
    const randomHour = Math.floor(Math.random() * 24);
    const hour = randomHour === 0 ? '00' : randomHour;
    const randomMins =  Math.floor(Math.random() * 60);
    const mins = randomMins < 10 ? `0${randomMins}` : randomMins;
    return `${hour}:${mins}`;
  }
  createImages() {
    const time = this.getTime();
    const createdDay = this.createRandomDay();
    const month = this.creatRandomMonth(createdDay);
    const day = createdDay < 10 ? `0${createdDay}` : `${createdDay}`;
    const year = this.createRandomYear();
    const dateString = `${day}/${month}/${year}`;
    const d = new Date(dateString);
    const dayName = this.days[d.getDay()];
    const name = `Picture ${day}-${year} ${time}`;
    console.log({ name, time, day, month, dayName, year });
    const body =  { name, url: '', day, month, dayName, year, time, type: '' };
    this.app.post('images/create', body).subscribe(res => {
      console.log(res);
    });
  }
  getImages() {
    this.app.get('images').subscribe((images: any) => {
      console.log(images);
      this.allImages = images;
    });
  }
  // sortByYear() {
  //   this.images = [];
  //   this.years.forEach(year => {
  //     const index = this.allImages.find(x => x.year === year);
  //     if (index) {
  //       const arr = this.allImages.filter(x => x.year === year);
  //       this.images.push(arr);
  //     }
  //   });
  // }
  sortByYear2(year) {
    this.hideYears = true;
    const arr = this.allImages.filter(x => x.year === year);
    this.sortByMonth(arr);
  }
  sortByMonth(arr) {
    this.images = [];
    this.months.forEach(month => {
      const index = arr.find(x => x.month === month);
      if (index) {
        this.monthLabels.push(month);
        const arrToPush = arr.filter(x => x.month === month);
        this.images.push(arrToPush);
      }
    });
    console.log(this.images);
  }
  addId() {
    console.log(v4());
  }
  handleActiveRow(activeRow) {
    this.activeRow = this.activeRow !== activeRow ? activeRow : null;
  }
  openPopup(images) {
    this.app.sliderInfos.next({state: true, images});
  }
}
