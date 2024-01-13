import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BairroService } from 'src/app/Services/bairro.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { ClienteService } from 'src/app/Services/cliente.service';
@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrl: './create-clients.component.scss',
})
export class CreateClientsComponent {
  public neigahood: any;

  constructor(
    public modal: NgxSmartModalService,
    private bairro: BairroService,
    public form: FormBuilder,
    private utils: UtilsService,
    private cliente: ClienteService
  ) {}

  public loading: boolean = false;
  public validateForm: boolean = false;
  public neighborHood: any;
  public meuFormulario: any;
  public bairroSelecionado: any;

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'Nome', value: null, required: true },
      { name: 'Sobrenome', value: null, required: true },
      { name: 'Telefone', value: null, required: true },
      { name: 'Contribuinte', value: null, required: true },
      { name: 'Email', value: null, required: true }
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
    data.bairroId = this.bairroSelecionado;
    this.cliente.createCliente(data).subscribe((response: any) => {});
    this.meuFormulario.reset();
  }

  obterBairros() {
    this.bairro.obterBairro().subscribe((response: any) => {
      this.neigahood = response;
    });
  }

  ngOnInit() {
    this.createFrm();
    this.obterBairros();
  }
}
