import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResiduoService } from 'src/app/Services/residuo.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { StockService } from 'src/app/Services/stock.service';
import { EmailService } from 'src/app/Services/email.service';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { interval, from } from 'rxjs';
import { switchMap, take, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
})
export class StockComponent {
  constructor(
    public modal: NgxSmartModalService,
    private residuo: ResiduoService,
    public form: FormBuilder,
    private utils: UtilsService,
    private cliente: ClienteService,
    private toast: ToastrService,
    private stock: StockService,
    private email: EmailService,
    private empresa: EmpresaService
  ) {}
  public meuFormulario: any;
  public redisuo: any;
  public loading: boolean = false;
  public validateQtd: boolean = false;
  public validateForm: any;

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'residuoId', value: null, required: true },
      { name: 'quantidade', value: null, required: true }
    );
  }

  cancel(modalId: any) {
    this.modal.getModal(modalId).close();
  }

  getResiduo() {
    this.residuo.listResiduo().subscribe((response: any) => {
      this.redisuo = response;
    });
  }

  submit() {
    let data = this.meuFormulario.value;
    this.stock.createStock(data).subscribe((response: any) => {
      if (response) {
        this.meuFormulario.reset();
        this.toast.success('Stock adicionado com sucesso!', 'Stock');
        this.cancel('createStockModal');
        this.stock.emitRecarregarStock(true);
        // this.sendEmail();  ACTIVA ESSA FUNÇÃO PARA ENVIAR E-MAIL
      } else {
        this.toast.error('Erro ao registar stock!', 'Stock');
        return;
      }
    });
  }

  sendEmail() {
    this.empresa.listEmailEmpresa().subscribe((response: any) => {
      const intervalo = 5000; // 5 segundos
      from(response)
        .pipe(
          concatMap((element: any, index: number) =>
            interval(index * intervalo).pipe(
              take(1),
              concatMap(() => {
                return this.email.sendemail(element.email);
              })
            )
          )
        )
        .subscribe((result: any) => {});
    });
  }

  containsOnlyLetters(value: any): boolean {
    const regex = /^[a-zA-Z]+$/; // Expressão regular para letras maiúsculas e minúsculas
    return regex.test(value);
  }

  // Função para verificar se uma string contém apenas números
  containsOnlyNumbers(value: any) {
    const regex = /^[0-9]+$/;
    this.validateQtd = regex.test(value.target.value);
  }

  ngOnInit() {
    this.createFrm();
    this.getResiduo();
  }
}
