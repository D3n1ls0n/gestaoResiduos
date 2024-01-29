import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ClienteService } from 'src/app/Services/cliente.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BairroService } from 'src/app/Services/bairro.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
    private toast: ToastrService,
    private http: HttpClient
  ) {}
  public baseUrl = environment.app_url;

  public loading: boolean = false;
  public validateForm: boolean = false;
  public clienteData: any;
  public meuFormulario!: FormGroup;
  public neighborHood: any;
  public bairroSelecionado: any;
  public neigahood: any;
  public validateEmail_: boolean = false;
  public validateNumber: boolean = false;
  public validateNif: boolean = false;
  public lastClientId: any;
  public userId: any;

  getModalData() {
    this.cliente.clienteData$.subscribe((data) => {
      this.clienteData = data;
      this.clienteData?.usuarios.forEach((element: any) => {
        this.userId = element.id;
      });

      this.utils.patchFormValues(this.meuFormulario, this.clienteData);
      /*  this.meuFormulario.value.bairroId = this.clienteData.bairroId */
    });
  }

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit() {
    let data = this.meuFormulario.value;
    let { username, password, confirmpassword, ...newData } = data;
    if (password !== confirmpassword) {
      this.toast.warning('Senhas não coinscidem!', 'Clientes');
      return;
    }
    this.validateEmail(data.email);
    if (!this.validateEmail_) {
      this.toast.error('O e-mail fornecido é inválido!', 'Clientes');
      return;
    }
    /* data.bairroId = this.bairroSelecionado; */
    this.cliente
      .editCliente(newData, this.clienteData.id)
      .subscribe((response: any) => {
        if (response) {
          this.meuFormulario.reset();
          this.toast.success('Cliente editado com sucesso!', 'Clientes');
          this.cancel('editClientModal');
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
              .put<any>(
                this.baseUrl + '/api/user/edit/' + this.userId,
                dataUser
              )
              .subscribe((response) => {});
          }, 500);
        } else {
          this.toast.error('Erro ao editar cliente!', 'Clientes');
          return;
        }
      });
  }

  getlastClientId() {
    this.http
      .get<any>(this.baseUrl + '/api/cliente/lista')
      .subscribe((response) => {
        if (response.length > 0) {
          // Obtenha o primeiro elemento
          const firstClient = response[0];
          this.lastClientId = firstClient.id;
        } else {
          console.log('A lista está vazia.');
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
      { name: 'bairroId', value: null, required: true },
      { name: 'username', value: null, required: true },
      { name: 'password', value: null, required: true },
      { name: 'confirmpassword', value: null, required: true }
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

  validateEmail(e: any) {
    let email = e;
    let isValid = this.validateEmail__(email);
    this.validateEmail_ = isValid;
  }

  validateEmail__(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    this.getModalData();
    this.obterBairros();
  }
}
