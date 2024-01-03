import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrl: './edit-clients.component.scss',
})
export class EditClientsComponent {
  constructor(public modal: NgxSmartModalService) {}
  public loading: boolean = false;
  public validateForm: boolean = false;



  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit(){}

}
