import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsComponent } from './reactiveForms/reactiveForms.component';
import { TDFormsComponent } from './TDForms/TDForms.component';
import { FormsMainComponent } from './formsMain.component';
import { SpinnerModule } from '../../tools/spinner/spinner.module';
import { PasswordCheckStrongModule } from "../../tools/passwordCheckStrong/passwordCheckStrong.module";
import { InputsModule } from "../../tools/inputs/inputs.module";

const routes: Routes = [
  { path: '', component: FormsMainComponent },
  { path: 'reactive', component: ReactiveFormsComponent },
  { path: 'templateDriven', component: TDFormsComponent },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    FormsMainComponent,
    ReactiveFormsComponent,
    TDFormsComponent,
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    SpinnerModule,
    PasswordCheckStrongModule,
    InputsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsMainComponent,
    ReactiveFormsComponent,
    TDFormsComponent,
  ],
})
export class FormsMainModule { }
