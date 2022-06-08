import { Component } from "@angular/core";

@Component({
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['portfolio.component.html']
})

export class PortfolioComponent {
  links = ['accueil', 'apropos', 'experiences', 'codewars', 'projets', 'contact'];
  skills = ['JavaScript', 'TypeScript', 'Angular', 'Raect', 'Nodejs', 'MongoDB', 'ElasticSearch', 'Webpack'];
}
