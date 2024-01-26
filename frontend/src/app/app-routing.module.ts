import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ClientsComponent } from '../components/clients/clients.component';
import { ItemsComponent } from '../components/items/items.component';
import { SadnessComponent } from '../components/sadness/sadness.component';
import { CompanyComponent } from '../components/company/company.component';
import { RewardsComponent } from '../components/rewards/rewards.component';
import { RewardTypeComponent } from '../components/configurations/reward-type/reward-type.component';
import { WastTypeComponent } from '../components/configurations/wast-type/wast-type.component';
import { TesteComponent } from '../components/teste/teste.component';
import { AuthGuard } from '../../src/app/Services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule),
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule),
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'sadness' /* Resíduo */,
        component: SadnessComponent,
      },
      {
        path: 'items' /* Itens disponíveis */,
        component: ItemsComponent,
      },
      {
        path: 'company' /* Empresa */,
        component: CompanyComponent,
      },
      {
        path: 'rewards' /* Resíduo */,
        component: RewardsComponent,
      },
      {
        path: 'rewards-types' /* Resíduo */,
        component: RewardTypeComponent,
      },
      {
        path: 'wast-types' /* Resíduo */,
        component: WastTypeComponent,
      },
    ],
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'teste',
    component: TesteComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'login' /* Resíduo */,
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
