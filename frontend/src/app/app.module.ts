import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';



// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  TableModule,
  AlertModule,
  PlaceholderModule,
  ModalModule,
} from '@coreui/angular';


import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { FormsModule } from '@angular/forms';


import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ClientsComponent } from '@docs-components/clients/clients.component';
import { ItemsComponent } from '@docs-components/items/items.component';
import { SadnessComponent } from '@docs-components/sadness/sadness.component';
import { CompanyComponent } from '@docs-components/configurations/company/company.component';
import { RewardsComponent } from '@docs-components/configurations/rewards/rewards.component';
import { Utilities } from '../app/utilities/utilities';
import { CreateClientsComponent } from '@docs-components/clients/create-clients/create-clients.component';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

const COMPONENTS = [
  ClientsComponent,
  ItemsComponent,
  SadnessComponent,
  CompanyComponent,
  RewardsComponent,
  CreateClientsComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, ...COMPONENTS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    HttpClientModule,
    TableModule,
    AlertModule,
    PlaceholderModule,
    ModalModule,
    NgxSmartModalModule.forRoot(),
    NgSelectModule,
    FormsModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    Title,
    Utilities,
    NgxSmartModalService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {

}
