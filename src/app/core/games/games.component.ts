import { Component } from "@angular/core";
import { AppService } from "../../app.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['games.component.scss']
})
export class GamesComponent {
  constructor(private app: AppService) {}

  handle(id) {
    this.app.goTo(`games/${id}`);
  }
}
