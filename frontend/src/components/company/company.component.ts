import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {
  constructor(
    public modal: NgxSmartModalService,
    private empresa: EmpresaService,
    private toast: ToastrService
  ) {}
  public loading: boolean = false;
  public empresas: any;
  recarregarClientesSubscription!: Subscription;
  public meuFormulario: any;

  openCreateCompany(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openEditCompany(modalId: string, empresa: any): void {
    this.empresa.setEmpresaData(empresa);
    this.modal.getModal(modalId).open();
  }

  getCliente() {
    this.empresa.listEmpresa().subscribe((response: any) => {
      this.empresas = response;
    });
  }

  deleteCliente(id: any) {
    this.empresa.deleteEmpresa(id).subscribe((response: any) => {
      if (response) {
        this.toast.success('Empresa eliminada com sucesso!', 'Empresas');
        this.empresa.emitRecarregarEmpresas(true);
      } else {
        this.toast.error('Erro ao eliminar empresa!', 'Empresas');
      }
    });
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
  }

  ngOnDestroy(): void {
    this.recarregarClientesSubscription.unsubscribe();
  }
}
