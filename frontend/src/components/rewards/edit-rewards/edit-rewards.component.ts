import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-edit-rewards',
  templateUrl: './edit-rewards.component.html',
  styleUrl: './edit-rewards.component.scss'
})
export class EditRewardsComponent {
  constructor(public modal: NgxSmartModalService) {}

  public loading: boolean = false;
  public validateForm: boolean = false;


  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }
  submit(){}
}
