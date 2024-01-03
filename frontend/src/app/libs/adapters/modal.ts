import { Injectable } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

type O = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

@Injectable({
  providedIn: 'root',
})
export abstract class _ModalLib {
  constructor(private ngxSmartModalService: NgxSmartModalService) {}

  open(component: any, data: any = {}, options: O = {}): void {
    let size: any = 'sm';
    if ((options as Object).hasOwnProperty('size') && options.size != null)
      size = options.size;
    this.close(component);
   /*  this.ngxSmartModalService
      .create(String(component), component,{
        dismissable: false,
      })
      .addCustomClass(size)
      .open()
      .setData(data, true); */
  }

  close(component: any): void {
    this.ngxSmartModalService.resetModalData(String(component));
    this.ngxSmartModalService.removeModal(String(component));
  }

  closeAll(): void {
    this.ngxSmartModalService.closeAll();
  }

  closeModal(component: any) {
    this.ngxSmartModalService.close(String(component));
  }

  getModalData(component: any): any {
    return this.ngxSmartModalService.getModalData(String(component));
  }

  resetModalData(component: any): any {
    return this.ngxSmartModalService.resetModalData(String(component));
  }
}
