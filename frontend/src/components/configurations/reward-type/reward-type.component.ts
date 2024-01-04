import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-reward-type',
  templateUrl: './reward-type.component.html',
  styleUrl: './reward-type.component.scss'
})
export class RewardTypeComponent {
  constructor(
    public modal: NgxSmartModalService
  ) {}

public loading: boolean = false

openEditRewardType(modalId: string): void {
  this.modal.getModal(modalId).open();
}

submit(){}
}
