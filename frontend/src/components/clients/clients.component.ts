import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ClienteService } from 'src/app/Services/cliente.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

/* import { IconSetService } from '@coreui/icons-angular';
import { IconSubset } from 'src/app/icons/icon-subset'; */

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  public loading: boolean = false;
  public clients: any;
  public is_superadmin: any
  recarregarClientesSubscription!: Subscription;
  public meuFormulario: any;

  constructor(
    public modal: NgxSmartModalService,
    private cliente: ClienteService,
    private toast: ToastrService
  ) {
    //private iconSetService: IconSetService - Isso vai dentro () do construtor
    //console.log(IconSubset);
    //this.iconSetService.icons = { ...IconSubset }
  }

  openCreateClient(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openEditClient(modalId: string, cliente: any): void {
    this.cliente.setClienteData(cliente);
    this.modal.getModal(modalId).open();
  }

  getCliente() {
    this.loading = true;
    const clientId: any = localStorage.getItem('cliente_id');
     this.is_superadmin = localStorage.getItem('is_superadmin');

    if (this.is_superadmin == 1) {
      this.cliente.listCliente().subscribe((response: any) => {
        this.clients = response;
      });
    }

    if (clientId > 0) {
      this.cliente.listCliente().subscribe((response: any) => {
        response.forEach((element: any) => {
          if (element.id == clientId) this.clients = [element];
          return;
        });
      });
    }
    this.loading = false;
  }

  deleteCliente(id: any) {
    this.cliente.deleteCliente(id).subscribe((response: any) => {
      if (response) {
        this.toast.success('Cliente eliminado com sucesso!', 'Clientes');
        this.cliente.emitRecarregarClientes(true);
      } else {
        this.toast.error('Erro ao eliminar cliente!', 'Clientes');
      }
    });
  }

  ngOnInit() {
    this.getCliente();
    // Inscreva-se no evento de recarregar clientes
    this.recarregarClientesSubscription = this.cliente
      .getRecarregarClientesObservable()
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
