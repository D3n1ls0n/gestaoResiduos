import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResiduoService } from 'src/app/Services/residuo.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { StockService } from 'src/app/Services/stock.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
})
export class ItemsComponent {
  recarregarStockSubscription!: Subscription;
  public loading: boolean = false;
  public stocks: any;
  public cliente_id: any;
  public empresa_id: any;
  public is_superadmin: any;


  constructor(
    public modal: NgxSmartModalService,
    private residuo: ResiduoService,
    public form: FormBuilder,
    private utils: UtilsService,
    private stock: StockService,
    private toast: ToastrService
  ) {}

  openCreateItems(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openCreateStock(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openEditClient(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openListItem(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  getStock() {
    this.stock.listStock().subscribe((response: any) => {
      this.stocks = response;
    });
  }

  ngOnInit() {
    this.getStock();
    // Inscreva-se no evento de recarregar clientes
    this.recarregarStockSubscription = this.stock
      .getRecarregarStocksObservable()
      .subscribe((recarregar) => {
        if (recarregar) {
          this.getStock();
        }
      });
    this.cliente_id = localStorage.getItem('cliente_id');
    this.empresa_id = localStorage.getItem('empresa_id');
    this.is_superadmin = localStorage.getItem('is_superadmin');
  }

  ngOnDestroy(): void {
    this.recarregarStockSubscription.unsubscribe();
  }
}
