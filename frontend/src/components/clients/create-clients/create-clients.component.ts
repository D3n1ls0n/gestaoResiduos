import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BairroService } from 'src/app/Services/bairro.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrl: './create-clients.component.scss',
})
export class CreateClientsComponent {
  public neigahood: any;
  public email: any;

  constructor(
    public modal: NgxSmartModalService,
    private bairro: BairroService,
    public form: FormBuilder,
    private utils: UtilsService,
    private cliente: ClienteService,
    private toast: ToastrService
  ) {}

  public loading: boolean = false;
  public validateForm: boolean = false;
  public validateEmail_: boolean = false;
  public validateNumber: boolean = false
  public validateNif: boolean = false
  public neighborHood: any;
  public meuFormulario: any;
  public bairroSelecionado: any;

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'Nome', value: null, required: true },
      { name: 'Sobrenome', value: null, required: true },
      { name: 'Telefone', value: null, required: true },
      { name: 'Contribuinte', value: null, required: true },
      { name: 'Email', value: null, required: true },
      { name: 'bairroId', value: null, required: true }
    );
  }

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  validateEmail(e: any) {
    let email = e.target.value;
    let isValid = this.validateEmail__(email);
    this.validateEmail_ = isValid

  }


  validateEmail__(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  selectNeighborHood(evt: any) {
    this.bairroSelecionado = evt.target.value;
  }

  submit() {
    let data = this.meuFormulario.value; /*
    data.bairroId = this.bairroSelecionado; */
    this.cliente.createCliente(data).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Cliente registado com sucesso!', 'Clientes');
        this.cancel('createClientModal');
        this.cliente.emitRecarregarClientes(true);
      } else {
        this.toast.error('Erro ao registar cliente!', 'Clientes');
        return;
      }
    });
  }

  obterBairros() {
    this.bairro.obterBairro().subscribe((response: any) => {
      this.neigahood = response;
    });
  }

  containsOnlyNumbersNIF(value: any) {
    const regex = /^[0-9]+$/;
    this.validateNif = regex.test(value.target.value);
  }

  containsOnlyNumbers(value: any) {
    const regex = /^[0-9]+$/;
    this.validateNumber = regex.test(value.target.value);
  }


  ngOnInit() {
    this.createFrm();
    this.obterBairros();
    this.meuFormulario.reset();
  }
}
