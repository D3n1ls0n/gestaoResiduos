import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { StockService } from 'src/app/Services/stock.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private toast: ToastrService
  ) {}

  public loading: boolean = false;
  public validateForm: boolean = false;
  public neighborHood: any;
  public residuo: any[] = [];
  public stocks: any;
  public qtd: any;
  public selectedStock: any;
  public meuFormulario: any;
  public residuo_: any = {
    nome: null,
    qtd: null,
    residuoId: null,
  };

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  selectNeighborHood(evt: any) {}

  addResiduo() {
    const existingResiduo = this.residuo.find(item => item.residuoId === this.residuo_.residuoId);

    if (!existingResiduo) {
      this.residuo.push({ ...this.residuo_ });
      this.resetResiduo();
    } else {
      this.toast.warning('Este artigo já foi adicionado!', 'Artigos');
    }
  }


  createFrm() {
    this.meuFormulario = this.utils.createForm({
      name: 'quantidade',
      value: null,
      required: true,
    });
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

  getStock() {
    this.stock.listStock().subscribe((response: any) => {
      this.stocks = response;
    });
  }

  seletectCriterial(r: any) {
    const selectedOption = r.target.selectedOptions[0];
    const residuoNome = selectedOption.value;
    const quantidade = selectedOption.getAttribute('data-quantidade');
    const residuoId = selectedOption.getAttribute('data-residuoId');
    this.residuo_.residuoId = residuoId;
    this.residuo_.qtd = quantidade;
    console.log(residuoId);

  }

  submit() {}

  ngOnInit() {
    this.createFrm();
    this.getStock();

  }
}
