import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import {CreateClienteInLoginComponent} from '../pages/login/create-cliente-in-login/create-cliente-in-login.component';
import {CreateCompanyInLoginComponent} from '../pages/login/create-company-in-login/create-company-in-login.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    CreateClienteInLoginComponent,
    CreateCompanyInLoginComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    ModalModule,
    JwtModule.forRoot({
      config: {
        // Configurações opcionais
      },
    }),
    NgxSmartModalModule.forRoot(),
  ]
})
export class PagesModule {
}
