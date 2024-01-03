import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CreateClientsComponent } from './create-clients/create-clients.component';
import { Utilities } from 'src/app/utilities/utilities';

/* import { IconSetService } from '@coreui/icons-angular';
import { IconSubset } from 'src/app/icons/icon-subset'; */

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  public loading: boolean = false;
  constructor(
    private utils: Utilities,
    public ngxSmartModalService: NgxSmartModalService
  ) {
    //private iconSetService: IconSetService - Isso vai dentro () do construtor
    //console.log(IconSubset);
    //this.iconSetService.icons = { ...IconSubset }
  }
  abrirModal(modalId: string): void {
    this.ngxSmartModalService.getModal(modalId).open();
  }

  openModal() {
    this.utils.modal.open(
      CreateClientsComponent,
      {},
      {
        size: 'md',
      }
    );
  }

  ngOnInit() {}
}
