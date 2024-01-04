import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent {
  constructor(public modal: NgxSmartModalService) {}
  public loading: boolean = false;
  public validateForm: boolean = false;



  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }
submit(){}
}
