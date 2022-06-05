import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-website-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class WebsiteSidebarComponent implements OnInit {
  skills = [
    {label: 'HTML', percentage: 95},
    {label: 'CSS', percentage: 95},
    {label: 'JS', percentage: 85},
    {label: 'Angular', percentage: 85},
    {label: 'React', percentage: 70},
    {label: 'MongoDB', percentage: 30},
  ];
  languages = [
    {label: 'Roumain', percentage: 100},
    {label: 'Russe', percentage: 90},
    {label: 'Français', percentage: 90},
    {label: 'Anglais', percentage: 70},
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
