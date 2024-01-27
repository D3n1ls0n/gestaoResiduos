import { Component } from '@angular/core';

import { navItems } from './_nav';
import { DadosService } from '../../Services/dados.service';
import { EmailService } from '../../Services/email.service';
import { BairroService } from '../../Services/bairro.service';
import { LoginComponent } from '../../../app/views/pages/login/login.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public Produto: any;
  public activateUtils: boolean = false;

  constructor(
    private dados: DadosService,
    private email: EmailService,
    private bairro: BairroService
  ) {}

  obterDados() {
    this.dados.obterDados().subscribe((response: any) => {});
  }

  onActivate(evt: any) {
    if (evt instanceof LoginComponent) {
      document.getElementById('body')?.classList.add('body-login-cr');
      this.activateUtils = false;
    } else {
      document.getElementById('body')?.classList.remove('body-login-cr');
      this.activateUtils = true;
    }
  }

  sendEmail() {
    this.email
      .sendemail('denilson105joao@gmail.com')
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  ngOnInit() {
    this.obterDados();
    /* this.sendEmail(); */
  }
}
