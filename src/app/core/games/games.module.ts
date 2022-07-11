import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from "@angular/common";
import { GamesComponent } from "./games.component";
import { PingpongComponent } from "./pingpong/pingpong.component";
import { PongComponent } from "./pong/pong.component";
import { BounceComponent } from "./bounce/bounce.component";

const routes: Routes = [
  { path: '', component: GamesComponent, children: [
      { path: 'ping-pong', component: PingpongComponent},
      { path: 'pong', component: PongComponent},
      { path: 'bounce', component: BounceComponent},
      { path: '**', redirectTo: '' }
    ],
  },
];
@NgModule({
  declarations: [
    GamesComponent,
    PingpongComponent,
    PongComponent,
    BounceComponent,
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
  ],
  exports: [
    GamesComponent,
    PingpongComponent,
    PongComponent,
    BounceComponent
  ]
})

export class GamesModule {}
