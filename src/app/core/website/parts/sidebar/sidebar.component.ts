import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-website-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class WebsiteSidebarComponent implements OnInit {
  skills = [
    {label: 'HTML', percentage: 95},
    {label: 'CSS', percentage: 90},
    {label: 'JS', percentage: 85},
    {label: 'Angular', percentage: 70},
    {label: 'MongoDB', percentage: 30},
  ];
  languages = [
    {label: 'Engish', percentage: 60},
    {label: 'French', percentage: 80},
    {label: 'Russsian', percentage: 80},
    {label: 'Roumanian', percentage: 100},
  ];
  links = [
    { icon: 'iconFacebook', link: 'www.facebook.com' },
    { icon: 'iconWhatsapp', link: 'www.whatsapp.com'},
    { icon: 'iconTwitter', link: 'www.twitter.com'},
    { icon: 'iconLinkedin', link: 'www.linkedin.com' },
  ]
  constructor() { }
  ngOnInit(): void {
  }
}
