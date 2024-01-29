import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ResiduoService } from 'src/app/Services/residuo.service';
import { UtilsService } from 'src/app/Services/utils.service';

@Component({
  selector: 'app-edit-sadness',
  templateUrl: './edit-sadness.component.html',
  styleUrl: './edit-sadness.component.scss',
})
export class EditSadnessComponent {
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
  public residuoData: any;
  public meuFormulario: any;
  public clienteId: any;
  public tipoRediduoId: any;
  public clientes: any;
  public tipoResiduos: any;
  public cliente_id: any;
  public empresa_id: any;
  public is_superadmin: any;

  getModalData() {
    this.residuo.residuoData$.subscribe((data) => {
      this.residuoData = data;

      this.utils.patchFormValues(this.meuFormulario, this.residuoData);
      /*  this.meuFormulario.value.bairroId = this.clienteData.bairroId */
    });
  }

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  isFormValid() {
    if (this.meuFormulario.invalid) {
      this.validateForm = false;
    }

    this.validateForm = true;
  }

  submit() {
    let data = this.meuFormulario.value;
    data.ClienteId = this.cliente_id
    this.residuo.editResiduo(data, this.residuoData.id).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Resíduo registado com sucesso!', 'Resíduos');
        this.cancel('editSadnessModal');
        this.residuo.emitRecarregarResiduo(true);
      } else {
        this.toast.error('Erro ao registar resíduo!', 'Resíduos');
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

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'nome', value: null, required: true },
      { name: 'tipoResiduoId', value: null, required: true },
      /* { name: 'clienteId', value: null, required: true } */
    );
  }

  ngOnInit() {
    this.createFrm();
    this.getModalData();
    this.obterCliente();
    this.obterTipoResiduo();
    this.cliente_id = localStorage.getItem('cliente_id');
    this.empresa_id = localStorage.getItem('empresa_id');
    this.is_superadmin = localStorage.getItem('is_superadmin');
  }
}
