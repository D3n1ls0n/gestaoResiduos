import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BairroService } from 'src/app/Services/bairro.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-create-company-in-login',
  templateUrl: './create-company-in-login.component.html',
  styleUrl: './create-company-in-login.component.scss'
})
export class CreateCompanyInLoginComponent {
  public baseUrl = environment.app_url;

  constructor(
    public modal: NgxSmartModalService,
    private bairro: BairroService,
    public form: FormBuilder,
    private utils: UtilsService,
    private empresa: EmpresaService,
    private toast: ToastrService,
    private http: HttpClient
  ) {}
  public loading: boolean = false;
  public validateForm: boolean = false;
  public meuFormulario: any;
  public neigahood: any;
  public bairroSelecionado: any;
  public validateEmail_: boolean = false;
  public lastCompanyId: any;


  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'Nome', value: null, required: true },
      { name: 'Telefone', value: null, required: true },
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

  selectNeighborHood(evt: any) {
    this.bairroSelecionado = evt.target.value;
  }

  submit() {
    let data = this.meuFormulario.value;
    let { username, password, confirmpassword, ...newData } = data;
    if (password !== confirmpassword){
      this.toast.warning('Senhas não coinscidem!', 'Empresas');
      return
    }
    this.empresa.createEmpresa(newData).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Cliente registado com sucesso!', 'Clientes');
        this.cancel('createCompanyModal');
        this.empresa.emitRecarregarEmpresas(true);
        this.getlastCompanyId();

        setTimeout(() => {
          let dataUser = {
            username: username,
            password: password,
            empresa_id: this.lastCompanyId,
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
  }

  getAllUser(){
    this.http
    .get<any>(this.baseUrl + '/api/user/listarUsuarios')
    .subscribe((response) => {

    });
  }

  obterBairros() {
    this.bairro.obterBairro().subscribe((response: any) => {
      this.neigahood = response;
    });
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


  getlastCompanyId() {
    this.http
      .get<any>(this.baseUrl + '/api/empresa/lista')
      .subscribe((response) => {
        if (response.length > 0) {
          // Obtenha o primeiro elemento
          const firstClient = response[0];
          this.lastCompanyId = firstClient.id;
          console.log('AQUI', this.lastCompanyId);
        } else {
          console.log('A lista está vazia.');
        }
      });
  }


  ngOnInit() {
    this.createFrm();
    this.obterBairros();
  }
}
