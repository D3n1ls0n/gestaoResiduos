import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-edit-wast-type',
  templateUrl: './edit-wast-type.component.html',
  styleUrl: './edit-wast-type.component.scss'
})
export class EditWastTypeComponent {
  constructor(public modal: NgxSmartModalService){}

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit(){}

}
