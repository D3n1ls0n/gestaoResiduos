import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrl: './create-clients.component.scss',
})
export class CreateClientsComponent {
  constructor(public modal: NgxSmartModalService) {}

  public loading: boolean = false;
  public validateForm: boolean = false;
  public neighborHood: any;


  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }



  selectNeighborHood(evt: any) {}
  submit() {}
  ngOnInit() {}
}
