import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrl: './create-items.component.scss'
})
export class CreateItemsComponent {
  constructor(public modal: NgxSmartModalService) {}

  public loading: boolean = false;
  public validateForm: boolean = false;
  public neighborHood: any;


  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  selectNeighborHood(evt:any){}

  submit() {}
}
