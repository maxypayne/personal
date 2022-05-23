import { CanActivate, RouterModule, Routes } from '@angular/router';
import { SmartHouseComponent } from './smartHouse.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { OverviewComponent } from './overview/overview.component';
import { DevicesComponent } from './devices/devices.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { NgModule } from '@angular/core';
import { RulesComponent } from './rules/rules.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SmartHouseHeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../../tools/spinner/spinner.module';
import { SliderModule } from '../../partials/slider/slider.module';
import { CheckLogin } from "../../tools/checkLogin/checkLogin";
import { PopupModule } from "../../tools/popup/popup.module";
import { CardsModule } from "../../partials/cards/cards.module";

const routes: Routes = [
  { path: '', component: SmartHouseComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'rules', component: AnalyticsComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'settings', component: SettingsComponent },
      // { path: 'homepage', component: HomepageComponent },
      {path: '**', redirectTo: 'overview' },
    ]},
];

@NgModule({
  declarations: [
    SmartHouseComponent,
    LoginComponent,
    SignupComponent,
    OverviewComponent,
    DevicesComponent,
    AnalyticsComponent,
    RulesComponent,
    GalleryComponent,
    HistoryComponent,
    SettingsComponent,
    SidebarComponent,
    SmartHouseHeaderComponent,
    HomepageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SpinnerModule,
    PopupModule,
    CardsModule,
    SliderModule,
  ],
  exports: [
    SmartHouseComponent,
    LoginComponent,
    SignupComponent,
    OverviewComponent,
    DevicesComponent,
    AnalyticsComponent,
    RulesComponent,
    GalleryComponent,
    HistoryComponent,
    SettingsComponent,
    SidebarComponent,
    SmartHouseHeaderComponent,
  ],
})

export class SmartHouseRoutingModule {}

