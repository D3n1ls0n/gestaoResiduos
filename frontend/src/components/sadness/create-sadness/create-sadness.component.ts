import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ResiduoService } from 'src/app/Services/residuo.service';
import { UtilsService } from 'src/app/Services/utils.service';

@Component({
  selector: 'app-create-sadness',
  templateUrl: './create-sadness.component.html',
  styleUrl: './create-sadness.component.scss',
})
export class CreateSadnessComponent {
  constructor(
    public modal: NgxSmartModalService,
    private utils: UtilsService,
    private residuo: ResiduoService,
    private toast: ToastrService,
    private cliente: ClienteService
  ) {}
  public loading: boolean = false;
  public validateForm: boolean = false;
  public neighborHood: any;
  public meuFormulario: any;
  public clienteId: any;
  public tipoRediduoId: any;
  public clientes: any;
  public tipoResiduos: any;
  public cliente_id: any;
  public empresa_id: any;
  public is_superadmin: any;

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'Nome', value: null, required: true },
      { name: 'TipoResiduoId', value: null, required: true },
      /* { name: 'ClienteId', value: null, required: true } */
    );
  }

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit() {
    let data = this.meuFormulario.value;
    data.ClienteId = this.cliente_id

    this.residuo.createResiduo(data).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Cliente registado com sucesso!', 'Clientes');
        this.cancel('createSadnessModal');
        this.residuo.emitRecarregarResiduo(true);
      } else {
        this.toast.error('Erro ao registar cliente!', 'Clientes');
        return;
      }
    });
  }

  selectCliente(evt: any) {
    this.clienteId = evt.target.value;
  }

  selectTipoResiduo(evt: any) {
    this.tipoRediduoId = evt.target.value;
  }

  obterCliente() {
    this.cliente.listCliente().subscribe((response: any) => {
      this.clientes = response;
    });
  }

  obterTipoResiduo() {
    this.residuo.listTipoResiduo().subscribe((response: any) => {
      this.tipoResiduos = response;
    });
  }

  ngOnInit() {
    this.createFrm();
    this.obterCliente();
    this.obterTipoResiduo();
    this.cliente_id = localStorage.getItem('cliente_id');
    this.empresa_id = localStorage.getItem('empresa_id');
    this.is_superadmin = localStorage.getItem('is_superadmin');
  }
}
