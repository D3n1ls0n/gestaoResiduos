import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.scss'
})
export class EditCompanyComponent {
  constructor(public modal: NgxSmartModalService) {}
  public loading: boolean = false;
  public validateForm: boolean = false;



  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }
submit(){}
}
