import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth/auth.component";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
  { path: '', component: RecipesComponent, children: [
      { path: 'auth', component: AuthComponent },
      { path: '**', redirectTo: 'auth' },
    ]
  }
]
@NgModule({
  declarations: [
    AuthComponent,
    RecipesComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    AuthComponent,
    RecipesComponent,
  ]
})

export class RecipesRoutingModule {}
