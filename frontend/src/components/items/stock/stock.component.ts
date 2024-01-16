import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResiduoService } from 'src/app/Services/residuo.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  constructor( public modal: NgxSmartModalService,
    private residuo: ResiduoService,
    public form: FormBuilder,
    private utils: UtilsService,
    private cliente: ClienteService,
    private toast: ToastrService){}
    public meuFormulario: any;
    public redisuo: any
    public loading: boolean = false
    public validateForm: any




    createFrm() {
      this.meuFormulario = this.utils.createForm(
        { name: 'residuoId', value: null, required: true },
        { name: 'quantidade', value: null, required: true },
      );
    }



  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }


  getResiduo() {
    this.residuo.listResiduo().subscribe((response: any) => {
      this.redisuo = response;
    });
  }


  submit(){}

  ngOnInit() {
    this.createFrm();
    this.getResiduo();
  }

}
