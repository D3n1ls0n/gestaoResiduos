import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ClienteService } from 'src/app/Services/cliente.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BairroService } from 'src/app/Services/bairro.service';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.scss',
})
export class EditCompanyComponent {
  public baseUrl = environment.app_url;

  constructor(
    public modal: NgxSmartModalService,
    private cliente: ClienteService,
    private utils: UtilsService,
    private bairro: BairroService,
    private toast: ToastrService,
    private empresa: EmpresaService,
    private http: HttpClient
  ) {}
  public loading: boolean = false;
  public validateEmail_: boolean = false;
  public bairroSelecionado: any;
  public neigahood: any;
  public validateForm: boolean = false;
  public empresaData: any;
  public meuFormulario!: FormGroup;
  public lastCompanyId: any;
  public userId: any;
  public companyId: any;

  getModalData() {
    this.empresa.empresaData$.subscribe((data) => {
      this.empresaData = data;
      this.companyId = this.empresaData?.id;
      this.empresaData?.usuarios.forEach((element: any) => {
        this.userId = element.id;
      });

      this.utils.patchFormValues(this.meuFormulario, this.empresaData);
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
      this.toast.warning('Senhas não coinscidem!', 'Empresas');
      return;
    }
    this.validateEmail(data.email);
    if (!this.validateEmail_) {
      this.toast.error('O e-mail fornecido é inválido!', 'Empresas');
      return;
    }
    /* data.bairroId = this.bairroSelecionado; */
    this.empresa
      .editEmpresa(newData, this.empresaData.id)
      .subscribe((response: any) => {
        if (response) {
          this.meuFormulario.reset();
          this.toast.success('Empresa editada com sucesso!', 'Empresas');
          this.cancel('editCompanyModal');
          this.cliente.emitRecarregarClientes(true);
          this.getlastCompanyId();

          setTimeout(() => {
            let dataUser = {
              username: username,
              password: password,
              empresa_id: this.companyId,
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
          this.toast.error('Erro ao editar empresa!', 'Empresas');
          return;
        }
      });
  }

  getlastCompanyId() {
    this.http
      .get<any>(this.baseUrl + '/api/empresa/lista')
      .subscribe((response) => {
        if (response.length > 0) {
          // Obtenha o primeiro elemento
          const firstClient = response[0];
          this.lastCompanyId = firstClient.id;
        } else {
          console.log('A lista está vazia.');
        }
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

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'nome', value: null, required: true },
      { name: 'telefone', value: null, required: true },
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

  ngOnInit() {
    this.createFrm();
    this.getModalData();
    this.obterBairros();
  }
}
