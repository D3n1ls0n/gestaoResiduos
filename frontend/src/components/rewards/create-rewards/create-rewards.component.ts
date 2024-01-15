import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BairroService } from 'src/app/Services/bairro.service';
import { RecompensaService } from 'src/app/Services/recompensa.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-rewards',
  templateUrl: './create-rewards.component.html',
  styleUrl: './create-rewards.component.scss',
})
export class CreateRewardsComponent {
  constructor(
    public modal: NgxSmartModalService,
    public form: FormBuilder,
    private utils: UtilsService,
    private cliente: ClienteService,
    private toast: ToastrService,
    private recompensa: RecompensaService
  ) {}

  public loading: boolean = false;
  public validateForm: boolean = false;
  public meuFormulario: any;
  public tipoRecompensa: any;
  public clientes: any

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'Nome', value: null, required: true },
      { name: 'Descricao', value: null, required: true },
      { name: 'clienteId', value: null, required: true },
      { name: 'tipoRecompensaId', value: null, required: true }
    );
  }

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit() {
    let data = this.meuFormulario.value;
    console.log(data);


    this.recompensa.createRecompensa(data).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Recompensa atribuída com sucesso!', 'Recompensa');
        this.cancel('createRewardsModal');
        this.cliente.emitRecarregarClientes(true);
      } else {
        this.toast.error('Erro ao atribuir recompensa!', 'Recompensa');
        return;
      }
    });
  }

  getTipoRecompensa() {
    this.recompensa.listTipoRecompensa().subscribe((response: any) => {
      this.tipoRecompensa = response;
    });
  }

  getCliente() {
    this.cliente.listCliente().subscribe((response: any) => {
      this.clientes = response;
    });
  }

  ngOnInit() {
    this.createFrm();
    this.getTipoRecompensa();
    this.getCliente()
  }
}
