import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BairroService } from 'src/app/Services/bairro.service';
import { RecompensaService } from 'src/app/Services/recompensa.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { ResiduoService } from 'src/app/Services/residuo.service';
@Component({
  selector: 'app-create-rewards',
  templateUrl: './create-rewards.component.html',
  styleUrl: './create-rewards.component.scss',
})
export class CreateRewardsComponent {
  constructor(
    public modal: NgxSmartModalService,
    public form: FormBuilder,
    private utils: UtilsService,
    private cliente: ClienteService,
    private toast: ToastrService,
    private recompensa: RecompensaService,
    private residuo: ResiduoService
  ) {}

  public loading: boolean = false;
  public validateForm: boolean = false;
  public meuFormulario: any;
  public tipoRecompensa: any;
  public clientes: any;
  public clientesMes: any;
  public residuos: any;

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'Nome', value: null, required: true },
      { name: 'Descricao', value: null, required: true },
      /* { name: 'clienteId', value: null, required: true }, */
      { name: 'tipoRecompensaId', value: null, required: true }
    );
  }

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  submit() {
    let data = this.meuFormulario.value;
    data.clienteId = this.clientesMes.clienteId
    this.recompensa.createRecompensa(data).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Recompensa atribuída com sucesso!', 'Recompensa');
        this.cancel('createRewardsModal');
        this.cliente.emitRecarregarClientes(true);
      } else {
        this.toast.error('Erro ao atribuir recompensa!', 'Recompensa');
        return;
      }
    });
  }

  getTipoRecompensa() {
    this.recompensa.listTipoRecompensa().subscribe((response: any) => {
      this.tipoRecompensa = response;
    });
  }

  getCliente() {
    this.cliente.listCliente().subscribe((response: any) => {
      this.clientes = response;
    });
  }

  getResiduos() {
    this.residuo.listResiduo().subscribe((response: any) => {
      this.residuos = response;
      this.encontrarResiduoMaisFrequente(this.residuos);
    });
  }

  encontrarResiduoMaisFrequente(residuos: any[]): any {
    const contagemClienteId = new Map<number, number>();
    const dataAtual = new Date();

    // Contar o número de ocorrências de cada clienteId no mesmo mês
    residuos.forEach((residuo) => {
      const clienteId = residuo.clienteId;
      const dataResiduo = new Date(residuo.created_at);

      // Verificar se o resíduo está no mesmo mês
      if (
        dataResiduo.getMonth() === dataAtual.getMonth() &&
        dataResiduo.getFullYear() === dataAtual.getFullYear()
      ) {
        contagemClienteId.set(
          clienteId,
          (contagemClienteId.get(clienteId) || 0) + 1
        );
      }
    });

    // Encontrar o clienteId que mais aparece
    let clienteIdMaisFrequente: any = null;
    let maxContagem = 0;

    contagemClienteId.forEach((contagem, clienteId) => {
      if (contagem > maxContagem) {
        maxContagem = contagem;
        clienteIdMaisFrequente = clienteId;
      }
    });

    // Filtrar os resíduos associados ao clienteId mais frequente no mesmo mês
    const residuosMaisFrequentes = residuos.filter((residuo) => {
      const dataResiduo = new Date(residuo.created_at);
      return (
        residuo.clienteId === clienteIdMaisFrequente &&
        dataResiduo.getMonth() === dataAtual.getMonth() &&
        dataResiduo.getFullYear() === dataAtual.getFullYear()
      );
    });

    // Se houver resíduos mais frequentes, retorne o primeiro
    this.clientesMes =
      residuosMaisFrequentes.length > 0 ? residuosMaisFrequentes[0] : null;
      console.log(this.meuFormulario.clienteId);

  }

  ngOnInit() {
    this.createFrm();
    this.getTipoRecompensa();
    this.getCliente();
    this.getResiduos();
  }
}
