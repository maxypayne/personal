import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { PipesModule } from "./tools/pipes/pipes.module";

const routes: Routes = [
  // { path: 'recipes',  loadChildren: () => import('./core/recipes/recipes.module').then(m => m.RecipesModule) },
  // { path: 'games',  loadChildren: () => import('./core/games/games.module').then(m => m.GamesModule) },
  // { path: 'jobs',  loadChildren: () => import('./core/jobs/jobs.module').then(m => m.JobsModule) },
  // { path: 'forms',  loadChildren: () => import('./core/forms/formsMain.module').then(m => m.FormsMainModule) },
  // { path: 'social',  loadChildren: () => import('./core/social/social.module').then(m => m.SocialModule) },
  // { path: 'noren',  loadChildren: () => import('./core/noren/noren.module').then(m => m.NorenModule) },
  // { path: 'smarthouse',  loadChildren: () => import('./core/smartHouse/smartHouse.module').then(m => m.SmartHouseModule) },
  // { path: 'shop',  loadChildren: () => import('./core/shop/shop.module').then(m => m.ShopModule) },
  // { path: 'rxjstuto',  loadChildren: () => import('./core/rxjstuto/rxjstuto.module').then(m => m.RxjstutoModule) },
  // { path: 'website',  loadChildren: () => import('./core/website/website.module').then(m => m.WebsiteModule) },
  // { path: 'fork-clone',  loadChildren: () => import('./core/fork/fork.module').then(m => m.ForkModule) }
  // { path: '',  loadChildren: () => import('./core/website/website.module').then(m => m.WebsiteModule) }
  { path: '',  loadChildren: () => import('./core/portfolio/portfolio.module').then(m => m.PortfolioModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    PipesModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
  ]
})
export class AppRoutingModule { }
