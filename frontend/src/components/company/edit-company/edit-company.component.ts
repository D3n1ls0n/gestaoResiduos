import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ClienteService } from 'src/app/Services/cliente.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BairroService } from 'src/app/Services/bairro.service';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from 'src/app/Services/empresa.service';
@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.scss',
})
export class EditCompanyComponent {
  constructor(
    public modal: NgxSmartModalService,
    private cliente: ClienteService,
    private utils: UtilsService,
    private bairro: BairroService,
    private toast: ToastrService,
    private empresa: EmpresaService
  ) {}
  public loading: boolean = false;
  public bairroSelecionado: any;
  public neigahood: any;
  public validateForm: boolean = false;
  public empresaData: any;
  public meuFormulario!: FormGroup;

  getModalData() {
    this.empresa.empresaData$.subscribe((data) => {
      this.empresaData = data;
      console.log("DATA", data);

      this.utils.patchFormValues(this.meuFormulario, this.empresaData);
      /*  this.meuFormulario.value.bairroId = this.clienteData.bairroId */
    });
  }

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }


  submit() {
    let data = this.meuFormulario.value;
    /* data.bairroId = this.bairroSelecionado; */
    this.empresa
      .editEmpresa(data, this.empresaData.id)
      .subscribe((response: any) => {
        if (response) {
          this.meuFormulario.reset();
          this.toast.success('Empresa editada com sucesso!', 'Empresas');
          this.cancel('editCompanyModal');
          this.cliente.emitRecarregarClientes(true);
        } else {
          this.toast.error('Erro ao editar empresa!', 'Empresas');
          return;
        }
      });
  }

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'nome', value: null, required: true },
      { name: 'telefone', value: null, required: true },
      { name: 'email', value: null, required: true },
      { name: 'bairroId', value: null, required: true }
    );
  }

  selectNeighborHood(evt: any) {
    this.bairroSelecionado = evt.target.value;
  }

  obterBairros() {
    this.bairro.obterBairro().subscribe((response: any) => {
      this.neigahood = response;
    });
  }

  ngOnInit() {
    this.createFrm();
    this.getModalData();
    this.obterBairros();
  }

}
