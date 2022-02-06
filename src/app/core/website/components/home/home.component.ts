import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-website-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WebsiteHomeComponent implements OnInit {
  cards = [
    {id: 'web', title: 'Web Development', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
    {id: 'design', title: 'UI/UX Design', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
    {id: 'sound', title: 'Sound Design', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
    {id: 'game', title: 'Game Design', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
    {id: 'adv', title: 'Advertising', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
    {id: 'photo', title: 'Photography', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
  ];
  prices = [
    {id: 'starter', title: 'Devise', price: 'FREE', options: ['Ui Design', 'Web Development', 'Logo design', 'SEO optimization', 'WordPress integration']},
    {id: 'hourly', title: 'Hourly', price: '35', options: ['Ui Design', 'Web Development', 'Logo design', 'SEO optimization', 'WordPress integration']},
    {id: 'full', title: 'Full Time', price: 'Contact me', options: ['Ui Design', 'Web Development', 'Logo design', 'SEO optimization', 'WordPress integration']},
  ];
  recommendations = [
    {id: '8jdsa6', name: 'Camelia Hugens', date:'04/07/2021', img: 'https://bslthemes.site/arter/wp-content/uploads/2020/09/testimonial-1-140x140.jpg'},
    {id: 'oynv75', name: 'Martine Moore', date:'28/04/2020', img: 'https://bslthemes.site/arter/wp-content/uploads/2020/09/testimonial-2-140x140.jpg'},
    // {id: 'dsa425', name: 'John Doe', date:'01/12/2021', img: 'https://bslthemes.site/arter/wp-content/uploads/2020/09/testimonial-3-140x140.jpg'},
    // {id: 'dsa425', name: 'John Doe', date:'01/12/2021', img: 'https://bslthemes.site/arter/wp-content/uploads/2020/09/testimonial-3-140x140.jpg'},
    // {id: 'dsa425', name: 'John Doe', date:'01/12/2021', img: 'https://bslthemes.site/arter/wp-content/uploads/2020/09/testimonial-3-140x140.jpg'},
    // {id: 'ha6ch', name: 'Gordel Hulio', date:'25/02/2021', img: 'https://bslthemes.site/arter/wp-content/uploads/2020/09/testimonial-4-140x140.jpg'},
  ]
  constructor() { }
  ngOnInit(): void {
  }
}
