import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

const routes: Routes = [
  { path: 'recipes',  loadChildren: () => import('./core/recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'games',  loadChildren: () => import('./core/games/games.module').then(m => m.GamesModule) },
  { path: 'jobs',  loadChildren: () => import('./core/jobs/jobs.module').then(m => m.JobsModule) },
  { path: 'forms',  loadChildren: () => import('./core/forms/formsMain.module').then(m => m.FormsMainModule) },
  { path: 'social',  loadChildren: () => import('./core/social/social.module').then(m => m.SocialModule) },
  { path: 'noren',  loadChildren: () => import('./core/noren/noren.module').then(m => m.NorenModule) },
  { path: 'smarthouse',  loadChildren: () => import('./core/smartHouse/smartHouse.module').then(m => m.SmartHouseModule) },
  { path: 'shop',  loadChildren: () => import('./core/shop/shop.module').then(m => m.ShopModule) },
  { path: 'website',  loadChildren: () => import('./core/website/website.module').then(m => m.WebsiteModule) }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
  ]
})
export class AppRoutingModule { }
