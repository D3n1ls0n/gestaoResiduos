import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  public loading: boolean = false;
  constructor(
    public modal: NgxSmartModalService
  ) {}

  openCreateItems(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openCreateStock(modalId: string): void {
    this.modal.getModal(modalId).open();
  }





  openEditClient(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

}
