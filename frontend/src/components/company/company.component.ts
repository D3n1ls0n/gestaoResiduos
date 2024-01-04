import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {
  constructor( public modal: NgxSmartModalService){}
  public loading: boolean = false;

  openCreateCompany(modalId: string): void {
    this.modal.getModal(modalId).open();
  }


  openEditCompany(modalId: string): void {
    this.modal.getModal(modalId).open();
  }
}
