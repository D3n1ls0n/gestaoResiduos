import { Component } from '@angular/core';
import { BairroService } from 'src/app/Services/bairro.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-cliente-in-login',
  templateUrl: './create-cliente-in-login.component.html',
  styleUrl: './create-cliente-in-login.component.scss',
})
export class CreateClienteInLoginComponent {
  public baseUrl = environment.app_url;

  public neigahood: any;
  public email: any;
  constructor(
    public modal: NgxSmartModalService,
    private bairro: BairroService,
    public form: FormBuilder,
    private utils: UtilsService,
    private cliente: ClienteService,
    private toast: ToastrService,
    private http: HttpClient
  ) {}
  public loading: boolean = false;
  public validateForm: boolean = false;
  public validateEmail_: boolean = false;
  public validateNumber: boolean = false;
  public validateNif: boolean = false;
  public neighborHood: any;
  public meuFormulario: any;
  public bairroSelecionado: any;
  public lastClientId: any;

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'Nome', value: null, required: true },
      { name: 'Sobrenome', value: null, required: true },
      { name: 'Telefone', value: null, required: true },
      { name: 'Contribuinte', value: null, required: true },
      { name: 'Email', value: null, required: true },
      { name: 'bairroId', value: null, required: true },
      { name: 'username', value: null, required: true },
      { name: 'password', value: null, required: true },
      { name: 'confirmpassword', value: null, required: true },
    );
  }

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  validateEmail(e: any) {
    let email = e.target.value;
    let isValid = this.validateEmail__(email);
    this.validateEmail_ = isValid;
  }

  validateEmail__(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  selectNeighborHood(evt: any) {
    this.bairroSelecionado = evt.target.value;
  }

  submit() {
    let data = this.meuFormulario.value;
    let { username, password, confirmpassword, ...newData } = data;
    if (password !== confirmpassword){
      this.toast.warning('Senhas não coinscidem!', 'Clientes');
      return
    }
    /*
      data.bairroId = this.bairroSelecionado; */
    this.cliente.createCliente(newData).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Cliente registado com sucesso!', 'Clientes');
        this.cancel('createClientModal');
        this.cliente.emitRecarregarClientes(true);
        this.getlastClientId();

        setTimeout(() => {
          let dataUser = {
            username: username,
            password: password,
            cliente_id: this.lastClientId,
            is_superadmin: false,
          };
          this.http
            .post<any>(this.baseUrl + '/api/user/add', dataUser)
            .subscribe((response) => {});
        }, 500);
      } else {
        this.toast.error('Erro ao registar cliente!', 'Clientes');
        return;
      }
    });

    /*  this.http.post<any>(this.baseUrl + "api/user/add", data).subscribe(
        (response) => {}
    ); */
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

  getlastClientId() {
    this.http
      .get<any>(this.baseUrl + '/api/cliente/lista')
      .subscribe((response) => {
        if (response.length > 0) {
          // Obtenha o primeiro elemento
          const firstClient = response[0];
          this.lastClientId = firstClient.id;
          console.log('AQUI', this.lastClientId);
        } else {
          console.log('A lista está vazia.');
        }
      });
  }

  ngOnInit() {
    this.createFrm();
    this.obterBairros();
    this.meuFormulario.reset();
  }
}
