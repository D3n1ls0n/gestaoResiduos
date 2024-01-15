import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RecompensaService } from 'src/app/Services/recompensa.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.scss',
})
export class RewardsComponent {
  constructor(
    public modal: NgxSmartModalService,
    private recompensa: RecompensaService,
    private cliente: ClienteService,
    private toast: ToastrService
  ) {}
  recarregarRecompensasSubscription!: Subscription;

  public loading: boolean = false;
  public clientes: any;
  public recompensas: any;

  abrirModal(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openEditClient(modalId: string): void {
    this.modal.getModal(modalId).open();
  }





  getRecompensa() {
    this.recompensa.listRecompensa().subscribe((response: any) => {
      this.recompensas = response;

    });
  }


  ngOnInit() {
    this.getRecompensa();
    // Inscreva-se no evento de recarregar clientes
    this.recarregarRecompensasSubscription = this.cliente
      .getRecarregarClientesObservable()
      .subscribe((recarregar) => {
        if (recarregar) {
          this.getRecompensa();
        }
      });
  }

  ngOnDestroy(): void {
    this.recarregarRecompensasSubscription.unsubscribe();
  }

}
