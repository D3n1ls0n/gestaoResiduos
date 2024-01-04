import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-create-rewards',
  templateUrl: './create-rewards.component.html',
  styleUrl: './create-rewards.component.scss'
})
export class CreateRewardsComponent {
  constructor(public modal: NgxSmartModalService) {}

  public loading: boolean = false;
  public validateForm: boolean = false;


  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit(){}
}
