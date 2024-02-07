import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {
  constructor(
    public modal: NgxSmartModalService,
    private empresa: EmpresaService,
    private toast: ToastrService,
    public http: HttpClient,
    private router: Router
  ) {}
  public loading: boolean = false;
  public empresas: any;
  recarregarClientesSubscription!: Subscription;
  public meuFormulario: any;
  public is_superadmin: any;
  public clientId: any;
  public clientNome: any;
  public username: any;
  public baseUrl = environment.app_url;

  openCreateCompany(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openEditCompany(modalId: string, empresa: any): void {
    this.empresa.setEmpresaData(empresa);
    this.modal.getModal(modalId).open();
  }

  getCliente() {
    const empresaId: any = localStorage.getItem('empresa_id');
    this.is_superadmin = localStorage.getItem('is_superadmin');
    if (this.is_superadmin == 'true') {
      this.empresa.listEmpresa().subscribe((response: any) => {
        this.empresas = response;
      });
      return;
    }

    if (empresaId > 0) {
      this.empresa.listEmpresa().subscribe((response: any) => {
        response.forEach((element: any) => {
          if (element.id == empresaId) {
            this.empresas = [element];
          }
        });
      });
    }
  }


  getEmpresaId(id: any, clienteNome: any) {
    this.clientId = id;
    this.clientNome = clienteNome;
  }

  deleteCliente(id: any) {
    const empresaId: any = localStorage.getItem('empresa_id');
    const userId: any = localStorage.getItem('userId');
    this.empresa.deleteEmpresa(id).subscribe((response: any) => {
      if (response) {
        this.toast.success('Empresa eliminada com sucesso!', 'Empresas');
        this.empresa.emitRecarregarEmpresas(true);
        setTimeout(() => {
          let dataUser = {
            username: this.username,
            password: "11111",
            cliente_id: 0,
            empresa_id: empresaId,
            is_delete: true,
            is_superadmin: false,
          };
          this.http
            .put<any>(this.baseUrl + '/api/user/edit/' + userId, dataUser)
            .subscribe((response) => {});
        }, 500);
      } else {
        this.toast.error('Erro ao eliminar empresa!', 'Empresas');
      }
    });
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getCliente();
    // Inscreva-se no evento de recarregar clientes
    this.recarregarClientesSubscription = this.empresa
      .getRecarregaEmpresasObservable()
      .subscribe((recarregar) => {
        if (recarregar) {
          this.getCliente();
        }
      });
    let nome = localStorage.getItem('username');
    this.username = nome?.replace(/^"(.*)"$/, '$1');
  }

  ngOnDestroy(): void {
    this.recarregarClientesSubscription.unsubscribe();
  }
}
