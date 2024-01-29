import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { ResiduoService } from 'src/app/Services/residuo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sadness',
  templateUrl: './sadness.component.html',
  styleUrl: './sadness.component.scss',
})
export class SadnessComponent {
  constructor(
    public modal: NgxSmartModalService,
    private residuo: ResiduoService,
    private toast: ToastrService
  ) {}

  recarregarResiduosSubscription!: Subscription;
  public meuFormulario: any;
  public loading: boolean = false;
  public residuos: any;


  openCreateSadness(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openEditSadness(modalId: string, residuo: any): void {
    this.residuo.setResiduoData(residuo);
    this.modal.getModal(modalId).open();
  }

  getCliente() {
    this.residuo.listResiduo().subscribe((response: any) => {
      /* response.forEach((element: any)=>{
        this.residuos = element.residuo;
      }) */

      this.residuos = response;
    });
  }

  deleteCliente(id: any) {
    this.residuo.deleteResiduo(id).subscribe((response: any) => {
      if (response) {
        this.toast.success('Cliente eliminado com sucesso!', 'Clientes');
        this.residuo.emitRecarregarResiduo(true);
      } else {
        this.toast.error('Erro ao eliminar cliente!', 'Clientes');
      }
    });
  }

  ngOnInit() {
    this.getCliente();
    // Inscreva-se no evento de recarregar clientes
    this.recarregarResiduosSubscription = this.residuo
      .getRecarregarResiduosObservable()
      .subscribe((recarregar) => {
        if (recarregar) {
          this.getCliente();
        }
      });
  }

  ngOnDestroy(): void {
    this.recarregarResiduosSubscription.unsubscribe();
  }
}
