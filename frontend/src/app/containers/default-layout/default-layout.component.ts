import { Component } from '@angular/core';

import { navItems } from './_nav';
import { DadosService } from '../../Services/dados.service';
import { EmailService } from '../../Services/email.service';
import { BairroService } from '../../Services/bairro.service';
import { LoginComponent } from '../../../app/views/pages/login/login.component';
import { Router } from '@angular/router';
 import { EventService } from 'src/app/Services/refresh.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public Produto: any;
  public cliente_id: any;
  public empresa_id: any;
  public activateUtils: boolean = false;
  public recarregouPagina: boolean = false;

  constructor(
    private dados: DadosService,
    private email: EmailService,
    private bairro: BairroService,
    private router: Router,
    private eventService: EventService
  ) {}

  /*  menu() {
    navItems.forEach((navbar) => {
      navbar.class = this.cliente_id === 1 ? '' : 'd-none';
    });
  }
 */
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

  getUser() {
    this.cliente_id = localStorage.getItem('cliente_id');
    this.empresa_id = localStorage.getItem('empresa_id');
  }

  ngOnInit() {
    this.obterDados();
    this.eventService.loginSuccess$.subscribe(() => {
      // Recarregue a página
     // window.location.reload();
    });
  }
}
