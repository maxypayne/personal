import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  imports: [
    SpinnerModule,
    CommonModule,
  ],
  declarations: [
    InputComponent,
  ],
  exports: [
    InputComponent,
  ]
})

export class HandlersModule {}
