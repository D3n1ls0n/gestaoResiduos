import { Component } from '@angular/core';

import { navItems } from './_nav';
import { DadosService } from '../../Services/dados.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public Produto: any;

  constructor(private dados: DadosService) {}

  obterDados() {
    this.dados.obterDados().subscribe((response: any) => {
      console.log(response);
    });
  }

  ngOnInit() {
    this.obterDados();
  }
}