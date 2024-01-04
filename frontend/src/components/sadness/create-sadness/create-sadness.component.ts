import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-create-sadness',
  templateUrl: './create-sadness.component.html',
  styleUrl: './create-sadness.component.scss',
})
export class CreateSadnessComponent {
  constructor(public modal: NgxSmartModalService) {}
  public loading: boolean = false;
  public validateForm: boolean = false;
  public neighborHood: any;

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit() {}
}
