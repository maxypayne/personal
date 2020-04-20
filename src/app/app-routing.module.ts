import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'jobs',  loadChildren: () => import('./core/jobs/jobs.module').then(m => m.JobsModule) },
  { path: 'forms',  loadChildren: () => import('./core/forms/formsMain.module').then(m => m.FormsMainModule) },
  { path: 'social',  loadChildren: () => import('./core/social/social.module').then(m => m.SocialModule) },
  { path: 'smarthouse',  loadChildren: () => import('./core/smartHouse/smartHouse.module').then(m => m.SmartHouseModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
