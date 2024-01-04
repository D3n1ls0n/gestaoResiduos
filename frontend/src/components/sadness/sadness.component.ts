import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-sadness',
  templateUrl: './sadness.component.html',
  styleUrl: './sadness.component.scss'
})
export class SadnessComponent {
constructor(public modal: NgxSmartModalService){}

  public loading: boolean = false;



  openCreateSadness(modalId: string): void {
    this.modal.getModal(modalId).open();
  }


  openEditSadness(modalId: string): void {
    this.modal.getModal(modalId).open();
  }
}
