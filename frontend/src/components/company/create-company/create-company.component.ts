import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BairroService } from 'src/app/Services/bairro.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from 'src/app/Services/empresa.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss',
})
export class CreateCompanyComponent {
  constructor(
    public modal: NgxSmartModalService,
    private bairro: BairroService,
    public form: FormBuilder,
    private utils: UtilsService,
    private empresa: EmpresaService,
    private toast: ToastrService
  ) {}
  public loading: boolean = false;
  public validateForm: boolean = false;
  public meuFormulario: any;
  public neigahood: any;
  public bairroSelecionado: any


  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'Nome', value: null, required: true },
      { name: 'Telefone', value: null, required: true },
      { name: 'Email', value: null, required: true },
      { name: 'bairroId', value: null, required: true }
    );
  }



  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  selectNeighborHood(evt: any) {
    this.bairroSelecionado = evt.target.value;
  }


  submit() {
    let data = this.meuFormulario.value;/*
    data.bairroId = this.bairroSelecionado; */
    this.empresa.createEmpresa(data).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Cliente registado com sucesso!', 'Clientes');
        this.cancel('createCompanyModal');
        this.empresa.emitRecarregarEmpresas(true);
      } else {
        this.toast.error('Erro ao registar cliente!', 'Clientes');
        return
      }
    });
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
