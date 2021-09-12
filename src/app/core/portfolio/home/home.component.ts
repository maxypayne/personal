import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-portfolio-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PortfolioHomeComponent {
  items = [
    // Google searching
    // documentation learning
    // Ultra Responsive
    // Unlimited Features
    {icon: 'iconLibrary', label: 'Google searching', text: 'Google a powerful tool to improve and do us a better programmers (without copy/paste)'},
    {icon: 'iconPlan', label: 'Unlimited Features', text: 'Every new feature is welcome, a good way to emprove my brain with new knowledge and help the asker'},
    {icon: 'iconOngoing', label: 'Ultra Responsive', text: 'Mobile/Tablet/Desktop thinking before or while building a new feature or project'},
    {icon: 'iconBlackLock', label: 'Creative Ideas', text: 'Every feature can be done better than initial stage, once problem is occured ideas how to to it better comes'},
    {icon: 'iconDownload', label: 'Easy Customization', text: 'Project can be done with lots of comments to explain a little bit how things works '},
    {icon: 'iconCalendar', label: 'Supper Support', text: 'Two options are available. One short answer while working '},
    {icon: 'iconCalendar', label: 'Documentation learning', text: 'Two options are available. One short answer while working'},
    {icon: 'iconCalendar', label: 'API implementation', text: 's'},
  ];
  skills = [
    { id: 'html', icon: 'iconHTML', text: 'Everything can be done'},
    { id: 'css', icon: 'iconCss', text: 'Infinite palette of colors'},
    { id: 'js', icon: 'iconJs', text: 'Logic stuff comes here'},
    { id: 'mongo', icon: 'iconMongo', text: 'Some bdd builded'},
    { id: 'teminal', icon: 'iconTerminal', text: 'Basic commands'},
    { id: 'git',icon: 'iconGit', text: 'Working in a team'},
    { id: 'github',icon: 'iconGithub', text: 'A small team experience'},
  ];
}
