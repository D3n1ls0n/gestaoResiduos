import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-edit-sadness',
  templateUrl: './edit-sadness.component.html',
  styleUrl: './edit-sadness.component.scss'
})
export class EditSadnessComponent {
  constructor(public modal: NgxSmartModalService) {}
  public loading: boolean = false;
  public validateForm: boolean = false;
  public neighborHood: any;

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit() {}
}
