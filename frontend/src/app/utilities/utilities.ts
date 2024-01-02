import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ModalLib} from '../libs/modal.lib'



@Injectable({
  providedIn: "root",
})
export class Utilities {
  public form!: FormGroup;
  public loading: boolean = false;
  public filters: any = {
    search: null,
    orderBy: null,
    startBy: null,
    endBy: null,
    pagination: {
      perPage: 20,
      page: 1,
      lastPage: null,
      total: null,
    },
  };
constructor(
  public modal: ModalLib
){}


private cancel(component: Function) {
  try {
    this.modal.close(component);
  } catch (error) {}
}

public closeAll() {
  try {
    this.modal.closeAll();
  } catch (error) {}
}

}
