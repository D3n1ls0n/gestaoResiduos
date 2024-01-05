import { Component } from '@angular/core';

import { navItems } from './_nav';
import { DadosService } from '../../Services/dados.service';
import { EmailService } from '../../Services/email.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public Produto: any;

  constructor(private dados: DadosService, private email: EmailService) {}

  obterDados() {
    this.dados.obterDados().subscribe((response: any) => {
      console.log(response);
    });
  }

  sendEmail() {
    this.email.senemail().subscribe((response: any) => {
      console.log(response);
    });
  }

  ngOnInit() {
    this.obterDados();
    //this.sendEmail();
  }
}
