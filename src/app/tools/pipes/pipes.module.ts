import { NgModule } from "@angular/core";
import { FileSizePipe } from "./fileSize";

@NgModule({
  exports: [
    FileSizePipe
  ],
  declarations: [FileSizePipe]
})
export class PipesModule {}
