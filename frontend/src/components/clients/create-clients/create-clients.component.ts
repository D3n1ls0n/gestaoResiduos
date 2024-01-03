import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrl: './create-clients.component.scss',
})
export class CreateClientsComponent {
  constructor(public ngxSmartModalService: NgxSmartModalService) {}

  public loading: boolean = false;
  public validateForm: boolean = false;
  public neighborHood: any;
  selectedCar: any;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  cancel(modalId: any) {
    this.ngxSmartModalService.getModal(modalId).close();
  }

  selectNeighborHood(evt: any) {}
  submit() {}
  ngOnInit() {}
}
