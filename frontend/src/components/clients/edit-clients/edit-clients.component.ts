import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ClienteService } from 'src/app/Services/cliente.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BairroService } from 'src/app/Services/bairro.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrl: './edit-clients.component.scss',
})
export class EditClientsComponent {
  constructor(
    public modal: NgxSmartModalService,
    private cliente: ClienteService,
    private utils: UtilsService,
    private bairro: BairroService,
    private toast: ToastrService
  ) {}
  public loading: boolean = false;
  public validateForm: boolean = false;
  public clienteData: any;
  public meuFormulario!: FormGroup;
  public neighborHood: any;
  public bairroSelecionado: any;
  public neigahood: any;

  getModalData() {
    this.cliente.clienteData$.subscribe((data) => {
      this.clienteData = data;
      this.utils.patchFormValues(this.meuFormulario, this.clienteData);
    });
  }

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit() {
    let data = this.meuFormulario.value;
    data.bairroId = this.bairroSelecionado;


    console.log(data);

    this.cliente.editCliente(data, this.clienteData.id).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Cliente editado com sucesso!', 'Clientes');
        this.cancel('editClientModal');
        this.cliente.emitRecarregarClientes(true);
      } else {
        this.toast.error('Erro ao editar cliente!', 'Clientes');
        return;
      }
    });
  }

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'nome', value: null, required: true },
      { name: 'sobrenome', value: null, required: true },
      { name: 'telefone', value: null, required: true },
      { name: 'contribuinte', value: null, required: true },
      { name: 'email', value: null, required: true },
      { name: 'bairroId', value: null, required: true }
    );
  }

  selectNeighborHood(evt: any) {
    this.bairroSelecionado = evt.target.value;
  }

  obterBairros() {
    this.bairro.obterBairro().subscribe((response: any) => {
      this.neigahood = response;
    });
  }

  ngOnInit() {
    this.createFrm();
    this.getModalData();
    this.obterBairros();
  }
}
