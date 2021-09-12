import { Component } from "@angular/core";
import { AppService } from "../../../app.service";

@Component({
  selector: 'app-portfolio-header',
  templateUrl: './portfolioHeader.component.html',
  styleUrls: ['portfolioHeader.component.scss']
})
export class PortfolioHeaderComponent {
  links = [
    {id: 'home', text: 'Home'},
    {id: 'about', text: 'About'},
    {id: 'service', text: 'Service'},
    {id: 'blog', text: 'Blog'},
    {id: 'contact', text: 'Contact'},
  ];
  constructor(private app: AppService) {
  }
  handleLink(value: string) {
    this.app.goTo(`/portfolio/${value}`)
  }
}
