import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-wast-type',
  templateUrl: './wast-type.component.html',
  styleUrl: './wast-type.component.scss'
})
export class WastTypeComponent {
  constructor(
    public modal: NgxSmartModalService
  ) {}

public loading: boolean = false

openEditRewardType(modalId: string): void {
this.modal.getModal(modalId).open();
}

submit(){}
}
