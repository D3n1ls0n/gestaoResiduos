import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.scss',
})
export class RewardsComponent {
  constructor(public modal: NgxSmartModalService) {}
  public loading: boolean = false;

  abrirModal(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openEditClient(modalId: string): void {
    this.modal.getModal(modalId).open();
  }
}
