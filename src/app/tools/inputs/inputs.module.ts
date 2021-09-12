import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InpComponent } from './inp/inp.component';
import { RadComponent } from './rad/rad.component';
import { SelComponent } from './sel/sel.component';
import { CheckComponent } from './check/check.component';
import { TextareaComponent } from "./textarea/textarea.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    InpComponent,
    RadComponent,
    SelComponent,
    CheckComponent,
    TextareaComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    InpComponent,
    RadComponent,
    SelComponent,
    CheckComponent,
    TextareaComponent,
  ]
})
export class InputsModule {}
