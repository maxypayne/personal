import { NgModule } from "@angular/core";
import { ColorDirective } from "./color.directive";

@NgModule({
  exports: [
    ColorDirective
  ],
  declarations: [ColorDirective]
})
export class DirectivesModule {}
