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
import { CalloutModule } from '@coreui/angular';


import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ClientsComponent } from '@docs-components/clients/clients.component';
import { ItemsComponent } from '@docs-components/items/items.component';
import { SadnessComponent } from '@docs-components/sadness/sadness.component';
import { CompanyComponent } from '@docs-components/company/company.component';
import { RewardsComponent } from '@docs-components/rewards/rewards.component';
import { Utilities } from '../app/utilities/utilities';
import { CreateClientsComponent } from '@docs-components/clients/create-clients/create-clients.component';
import { EditClientsComponent } from '@docs-components/clients/edit-clients/edit-clients.component';
import { CreateSadnessComponent } from '@docs-components/sadness/create-sadness/create-sadness.component';
import { EditSadnessComponent } from '@docs-components/sadness/edit-sadness/edit-sadness.component';
import { CreateRewardsComponent } from '@docs-components/rewards/create-rewards/create-rewards.component';
import { EditRewardsComponent } from '@docs-components/rewards/edit-rewards/edit-rewards.component';
import { CreateCompanyComponent } from '@docs-components/company/create-company/create-company.component';
import { EditCompanyComponent } from '@docs-components/company/edit-company/edit-company.component';
import { RewardTypeComponent } from '@docs-components/configurations/reward-type/reward-type.component';
import { EditRewardTypeComponent } from '@docs-components/configurations/reward-type/edit-reward-type/edit-reward-type.component';
import { WastTypeComponent } from '@docs-components/configurations/wast-type/wast-type.component';
import { EditWastTypeComponent } from '@docs-components/configurations/wast-type/edit-wast-type/edit-wast-type.component';
import { CreateItemsComponent } from '@docs-components/items/create-items/create-items.component';
import { ToastrModule } from 'ngx-toastr';

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
  CreateClientsComponent,
  EditClientsComponent,
  CreateSadnessComponent,
  EditSadnessComponent,
  CreateRewardsComponent,
  EditRewardsComponent,
  CreateCompanyComponent,
  EditCompanyComponent,
  RewardTypeComponent,
  EditRewardTypeComponent,
  WastTypeComponent,
  EditWastTypeComponent,
  CreateItemsComponent,
  EditClientsComponent,
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
    FormsModule,
    CalloutModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    Title,
    Utilities,
    NgxSmartModalService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
