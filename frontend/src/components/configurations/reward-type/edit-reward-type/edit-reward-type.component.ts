import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-edit-reward-type',
  templateUrl: './edit-reward-type.component.html',
  styleUrl: './edit-reward-type.component.scss'
})
export class EditRewardTypeComponent {
  constructor(public modal: NgxSmartModalService){}

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit(){}

}
