import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { StockService } from 'src/app/Services/stock.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { FaturaService } from 'src/app/Services/fatura.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrl: './create-items.component.scss',
})
export class CreateItemsComponent {
  constructor(
    public modal: NgxSmartModalService,
    private stock: StockService,
    private utils: UtilsService,
    private toast: ToastrService,
    private empresa: EmpresaService,
    private fatura: FaturaService
  ) {}

  recarregarStocksSubscription!: Subscription;

  public loading: boolean = false;
  public validateForm: boolean = false;
  public neighborHood: any;
  public residuo: any[] = [];
  public residuoToSend_: any[] = [];
  public stokIds_: any[] = [];
  public stocks: any;
  public qtd: any;
  public empresas: any;
  public empresaId: any;
  public selectedStock: any;
  public meuFormulario: any;
  public residuo_: any = {
    nome: null,
    qtd: null,
    residuoId: null,
  };

  public residuoToSend: any = {
    ResiduoId: null,
    EmpresaId: null,
    quantidade: null
  };

  public stokIds: any = {
    Id: null,
  };
  public cliente_id: any;
  public empresa_id: any;
  public is_superadmin: any;

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  selectNeighborHood(evt: any) {}

  addResiduo() {
    const existingResiduo = this.residuo.find(
      (item) => item.residuoId === this.residuo_.residuoId
    );

    if (!existingResiduo) {
      this.residuo.push({ ...this.residuo_ });
      this.residuoToSend_.push({ ...this.residuoToSend });
      this.stokIds_.push({ ...this.stokIds });

      /* this.residuoToSend.residuoId = residuoId;
    this.residuoToSend.EmpresaId = this.empresaId; */
      this.resetResiduo();
    } else {
      this.toast.warning('Este artigo já foi adicionado!', 'Artigos');
    }
  }

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      {
        name: 'quantidade',
        value: null,
        required: true,
      }
      /* {
        name: 'empresaId',
        value: null,
        required: true,
      } */
    );
  }

  removeResiduo(r: any) {
    const listResiduo = this.residuo;
    this.residuo = [];
    this.residuo = listResiduo.filter((v: any) => v != r);
    this.resetResiduo();
  }

  resetResiduo() {
    this.residuo_.nome = null;
    this.residuo_.qtd = null;
    this.residuo_.residuoId = null;
  }

  getEmpresas() {
    this.empresa.listEmpresa().subscribe((response: any) => {
      this.empresas = response;
    });
  }

  getStock() {
    this.stock.listStock().subscribe((response: any) => {
      this.stocks = response;
    });
  }

  resetStockId(stockId: any) {
    this.stock.resetStock(stockId).subscribe((response: any) => {});
  }

  seletectCriterial(r: any) {
    const selectedOption = r.target.selectedOptions[0];
    const residuoNome = selectedOption.value;
    const quantidade = selectedOption.getAttribute('data-quantidade');
    const residuoId = selectedOption.getAttribute('data-residuoId');
    this.residuo_.residuoId = residuoId;
    this.residuo_.qtd = quantidade;

    this.residuoToSend.ResiduoId = residuoId;
    this.residuoToSend.EmpresaId = this.empresa_id;
    this.residuoToSend.quantidade = quantidade;
    this.stokIds.Id = residuoId;
  }
  selectEmpresa(e: any) {
    this.empresaId = e.target.value;
  }

  submit() {
    /* if (!this.empresaId) {
      this.toast.error('É necessário selecionar uma empresa!', 'Item');
      return;
    } */

    this.fatura.createFatura(this.residuoToSend_).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Item registado com sucesso!', 'Item');
        this.fatura.emitRecarregarClientes(true);
        this.cancel('createItemsModal');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        this.toast.error('Erro ao registar item!', 'Item');
        return;
      }
    });
    this.resetResiduo();
    this.resetStockId(this.stokIds_);
  }

  ngOnInit() {
    this.createFrm();
    this.getStock();
    this.getEmpresas();
    // Inscreva-se no evento de recarregar clientes
    this.recarregarStocksSubscription = this.stock
      .getRecarregarStocksObservable()
      .subscribe((recarregar) => {
        if (recarregar) {
          this.getStock();
        }
      });
    this.empresaId = null;
    this.residuo_.nome = null;
    this.cliente_id = localStorage.getItem('cliente_id');
    this.empresa_id = localStorage.getItem('empresa_id');
    this.is_superadmin = localStorage.getItem('is_superadmin');
  }

  ngOnDestroy(): void {
    this.recarregarStocksSubscription.unsubscribe();
  }
}
